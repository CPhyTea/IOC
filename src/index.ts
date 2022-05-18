import {getBean} from "./bean";
import {Student} from "./person";

const student: Student = getBean('Student') as Student;
console.log(student);
