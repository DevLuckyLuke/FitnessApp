//a Exercise consists of a name, a description, a category, a duration, a reps, weight
 export class Exercise {
    constructor(
        public name: string,
        public description: string,
        public category: string,
        public duration: number,
        public reps: number,
        public weight: number
    ){}
}
