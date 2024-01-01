import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Exercise } from '../Model/exercise.model';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private firestore: AngularFirestore) {}

  getExercises(): Observable<Exercise[]> {
    return this.firestore.collection<Exercise>('Exercises').valueChanges({ idField: 'id' });
  }

  addExercise(exercise: Exercise): Promise<void> {
    const id = this.firestore.createId(); // Erzeugen einer einzigartigen ID für das neue Dokument
    return this.firestore.doc<Exercise>(`Exercises/${id}`).set(exercise);
  }

  getCardioExercises(): Observable<Exercise[]> {
    return this.firestore.collection<Exercise>('Exercises', ref => 
      ref.where('category', '==', 'Cardio')
    ).valueChanges({ idField: 'id' });
  }

  getStrengthExercises(): Observable<Exercise[]> {
    return this.firestore.collection<Exercise>('Exercises', ref => 
      ref.where('category', '==', 'Strength')
    ).valueChanges({ idField: 'id' });
  }
}
