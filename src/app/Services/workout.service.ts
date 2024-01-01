import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Workout } from '../Model/workout.model';
import { StrengthWorkoutExercise } from '../Model/strength-workout-exercise.model';
import { CardioWorkoutExercise } from '../Model/cardio-workout-exercise';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private currentWorkoutId: string | null = null;

  

  setCurrentWorkoutId(workoutId: string) {
    this.currentWorkoutId = workoutId;
  }

  getCurrentWorkoutId(): string | null {
    return this.currentWorkoutId;
  }

  constructor(private firestore: AngularFirestore) {}

  addWorkout(): Promise<void> {
    const workout: Workout = {
      name: '',
      date: new Date(),
      user: 'userId',
    };
  
    return this.firestore.collection('Workouts').add(workout)
      .then(docRef => {
        console.log('Workout created with ID:', docRef.id);
        this.setCurrentWorkoutId(docRef.id); 
      })
      .catch(error => {
        console.error('Error creating workout:', error);
        throw error;
      });
  }
  

 
  addStrengthExerciseToWorkout(workoutId: string, exercise: StrengthWorkoutExercise): Promise<void> {
    return this.firestore.collection(`Workouts/${workoutId}/Workout-Exercise-List`).add(exercise).then(() => {});
  }


 
  getStrengthExercisesFromWorkout(workoutId: string): Observable<StrengthWorkoutExercise[]> {
    return this.firestore.collection<StrengthWorkoutExercise>(`Workouts/${workoutId}/Workout-Exercise-List`)
      .valueChanges({ idField: 'id' }) 
      .pipe(
        map(exercises => exercises as StrengthWorkoutExercise[])
      );
  }

  addCardioExerciseToWorkout(workoutId: string, exercise: CardioWorkoutExercise): Promise<void> {
    return this.firestore.collection(`Workouts/${workoutId}/Workout-Exercise-List`).add(exercise).then(() => {});
  }

  // Methode, um Cardio-Übungen aus einem Workout zu erhalten
  getCardioExercisesFromWorkout(workoutId: string): Observable<CardioWorkoutExercise[]> {
    return this.firestore.collection<CardioWorkoutExercise>(`Workouts/${workoutId}/Workout-Exercise-List`)
      .valueChanges({ idField: 'id' }) 
      .pipe(
        map(exercises => exercises as CardioWorkoutExercise[])
      );
  }

  setWorkoutName(workoutId: string, name: string): Promise<void> {
    return this.firestore.doc(`Workouts/${workoutId}`).update({ name: name });
  }

  getWorkoutName(workoutId: string): Observable<string> {
    return this.firestore.doc<Workout>(`Workouts/${workoutId}`).valueChanges()
      .pipe(
        map(workout => workout?.name as string)
      );
  }

}
