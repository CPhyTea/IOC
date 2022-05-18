import {Inject, Injectable, InjectValue} from './decorator';
import {Cat} from "./dog";

export interface Person {
    name: string;
    age: number;
    cat: Cat;
}

@Injectable()
export class Student implements Person {
    @InjectValue('${student.name}')
    name: string;
    @InjectValue('${student.age}')
    age: number;
    @Inject('Cat')
    cat: Cat;

    constructor(name: string, age: number, cat: Cat) {
        this.name = name;
        this.age = age;
        this.cat = cat;
    }
}
