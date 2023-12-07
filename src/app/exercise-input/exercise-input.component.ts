import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface exercise {
  title: any; 
  bodyArea: any;
}

@Component({
  selector: 'app-exercise-input',
  templateUrl: './exercise-input.component.html',
  styleUrls: ['./exercise-input.component.css']
})
export class ExerciseInputComponent {

constructor(
  private firestore: AngularFirestore
) {}


title: any;
bodyArea: any;

addExercise(){

//collect inputs
const title: any = this.title;
const bodyArea: any = this.bodyArea;

console.log(title)
console.log(bodyArea)
//send inputs
const exercise: exercise={title, bodyArea}
this.firestore.collection('Exercises').doc(this.title).set(exercise)

}
}