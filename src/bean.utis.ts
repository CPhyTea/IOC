import 'reflect-metadata';
// 获取属性注入的值
export function getInject(target: Object, propertyKey: string) {
    return Reflect.getMetadata('inject', target, propertyKey);
}

/**
 * 解析注入的inject value
 * @param target
 * @param propertyKey
 * @param config
 */
export function parseInjectValue(target: Object, propertyKey: string, config: unknown) {
    const injectValue = Reflect.getMetadata('injectValue', target, propertyKey);
    const pattern = /\$\{(.*)\}/;

    let result: any;

    if (pattern.test(injectValue)) {
        const propPath = RegExp.$1;
        const jsonConfig = config;
        const pathArr = propPath.split('.');
        result = jsonConfig;
        pathArr.forEach(path => {
            if (result === null || result === undefined) {
                throw new Error('检查传入配置的prop是否正确')
            }
            result = result[path]
        })
    } else {
        result = injectValue
    }
    return result as unknown;
}
