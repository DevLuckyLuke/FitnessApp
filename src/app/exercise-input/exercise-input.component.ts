import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Exercise {
  title: string;
  bodyArea: string;
  category: string; 
}

@Component({
  selector: 'app-exercise-input',
  templateUrl: './exercise-input.component.html',
  styleUrls: ['./exercise-input.component.css']
})
export class ExerciseInputComponent {
  title: string = '';
  bodyArea: string = '';
  category: string = ''; 

  constructor(private firestore: AngularFirestore) {}

  addExercise() {
    const exercise: Exercise = {
      title: this.title,
      bodyArea: this.bodyArea,
      category: this.category
    };

    this.firestore.collection('Exercises').doc(this.title).set(exercise)
      .then(() => {
        this.resetForm();        
      })
      .catch(error => {
        console.error("Error adding exercise: ", error);
      });
  }

  resetForm() {
    this.title = '';
    this.bodyArea = '';
    this.category = '';
  }
}