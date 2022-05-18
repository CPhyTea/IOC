import "reflect-metadata"



// 标记该类可注册属性
export function Injectable(): ClassDecorator {
    return target => {
        Reflect.defineMetadata('injectable', true, target)
    }
}

// 为属性注入值
export function InjectValue(value: unknown) {
    return Reflect.metadata('injectValue', value)
}

// 注入值
export function Inject(value: unknown) {
    return Reflect.metadata('inject', value)
}
