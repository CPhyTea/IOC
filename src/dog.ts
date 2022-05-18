import {Injectable, InjectValue} from "./decorator";

interface Pet {
    name: string;
    type: number;
}

@Injectable()
export class Cat implements Pet{
    @InjectValue('${chouchou.name}')
    name: string;
    @InjectValue('${chouchou.type}')
    type: number;

    constructor(name: string, type: number) {
        this.name = name;
        this.type = type;
    }
}
