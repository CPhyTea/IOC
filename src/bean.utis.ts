import 'reflect-metadata';

type beanTypes = Record<string, Function>

const beans: beanTypes = {}

export function saveBean(target: Function) {
    // @ts-ignore
    const name = target.name;
    beans[name] = target;
}

// 获取属性注入的值
export function getMetaValue(target: Object, propertyKey: string) {
    return Reflect.getMetadata('injectValue', target, propertyKey);
}

// 创建bean
export function createBean(name: string) {
    const Bean = beans[name];
    if(!Bean) {
        throw new Error('没有对应的类，无法创建实例');
    }
    // 判断是否可以注入
    const injectable: boolean = Reflect.getMetadata('injectable', Bean);
    if (!injectable) {
        return Bean;
    }
    // 利用反射创建实例
    const result = Reflect.construct(Bean,[]);
    Object.keys(result).forEach(key => {
        // 获取装饰器injectValue的值
        const injectValue = getMetaValue(result, key);
        if (injectValue !== undefined || injectValue !== null) {
            Reflect.defineProperty(result, key, injectValue);
        } else {
            const classInjectValue = Reflect.get(Bean, key);
            Reflect.defineProperty(result, key, classInjectValue);
        }
    })
}
