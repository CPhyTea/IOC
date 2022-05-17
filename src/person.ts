import { injectable, injectValue } from './decorator';

@injectable()
export class Person {
    @injectValue('3w')
    name: string;
    @injectValue('1h')
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
