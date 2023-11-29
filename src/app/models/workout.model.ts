import { Exercise } from "./exercise.model";
import { User } from "./user.model";
import { Timestamp } from "@firebase/firestore-types";

export class Workout {
    constructor(
        public name: string,
        public date: Timestamp,
        public user: User,
        public exercises: Exercise[]
    ){}

    toString(): string {
        return this.name + " " + this.date + " " + this.user + " " + this.exercises;
    }
}


