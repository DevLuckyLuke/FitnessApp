import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Workout } from '../Model/workout.model';
import { WorkoutExercise } from '../Model/workout-exercise.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private firestore: AngularFirestore) {}

  addWorkout(): Promise<void> {
    const workout: Workout = {
      date: new Date().toISOString(),
      user: 'userId', // Replace with actual user ID
      exercises: [] // Initially empty
    };
  
    return this.firestore.collection('Workouts').add(workout)
      .then(docRef => {
        console.log('Workout created with ID:', docRef.id);
      })
      .catch(error => {
        console.error('Error creating workout:', error);
        throw error; // Re-throw the error for caller to handle if needed
      });
  }
  

  // Methode zum Hinzufügen einer Übung zu einem spezifischen Workout
  addExerciseToWorkout(workoutId: string, exercise: WorkoutExercise): Promise<void> {
    return this.firestore.collection(`Workouts/${workoutId}/Workout-Exercise-List`).add(exercise).then(() => {});
  }
 
  getExercisesFromWorkout(workoutId: string): Observable<WorkoutExercise[]> {
    return this.firestore.collection<WorkoutExercise>(`Workouts/${workoutId}/Workout-ExerciseList`)
      .valueChanges({ idField: 'id' }) // Diese Option fügt jedem WorkoutExercise-Objekt eine 'id'-Eigenschaft hinzu
      .pipe(
        map(exercises => exercises as WorkoutExercise[])
      );
  }

}
