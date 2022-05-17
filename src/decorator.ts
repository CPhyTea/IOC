import "reflect-metadata"

// 标记该类可注册属性
export function injectable(): ClassDecorator {
    return target => {
        Reflect.defineMetadata('injectable', true, target)
    }
}

// 为属性赋值
export function injectValue(value: unknown) {
    return Reflect.metadata('injectValue', value)
}
