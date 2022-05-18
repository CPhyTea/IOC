import {getInject, parseInjectValue} from "./bean.utis";
import * as beanConfig from './beanConfig.json';
import {Student} from "./person";
import {Cat} from "./dog";

export class BeanFactory {
    private container: Record<string | symbol, Function>;
    private config: object;

    constructor(config: unknown) {
        this.container = {};
        this.config = config as object;
    }

    add(target: Function, name?: string | symbol) {
        const targetName = name || target.name;
        this.container[targetName] = target;
    }

    build() {
        const getBean = (name: string | symbol) => {
            const Bean = this.container[name];
            if (!Bean) {
                throw new Error('没有对应的类，无法创建');
            }
            const beanInjectable: boolean = this.isInjectable(Bean);
            if (!beanInjectable) return Bean;
            const bean = Reflect.construct(Bean, []);
            Object.keys(bean).forEach(key => {
                // 获取装饰器injectValue的值
                const injectValue = parseInjectValue(bean, key, this.config);
                if (injectValue) {
                    Reflect.defineProperty(bean, key, {
                        value: injectValue
                    })
                }

                // 获取装饰器Inject的值
                const inject = getInject(bean, key);
                if (inject) {
                    const injectBean = getBean(inject);
                    Reflect.defineProperty(bean, key, {
                        value: injectBean
                    })
                }

                if (!injectValue && !inject) {
                    const value = Reflect.get(bean, key);
                    Reflect.defineProperty(bean, key, {
                        value
                    })
                }
            })
            return bean as object;
        }
        return getBean;
    }

    private isInjectable(target: Function): boolean {
        return Reflect.getMetadata('injectable', target);
    }
}

export function beanFactoryConfig(config: unknown): BeanFactory {
    return new BeanFactory(config);
}

const beanFactory = beanFactoryConfig(beanConfig)
beanFactory.add(Cat)
beanFactory.add(Student)


export const getBean = beanFactory.build()
