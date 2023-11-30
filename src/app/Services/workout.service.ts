import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Workout } from '../Model/workout.model';
import { WorkoutExercise } from '../Model/workout-exercise.model';

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
      date: new Date().toISOString(),
      user: 'userId',
      exercises: [] 
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
  

 
  addExerciseToWorkout(workoutId: string, exercise: WorkoutExercise): Promise<void> {
    return this.firestore.collection(`Workouts/${workoutId}/Workout-Exercise-List`).add(exercise).then(() => {});
  }


 
  getExercisesFromWorkout(workoutId: string): Observable<WorkoutExercise[]> {
    return this.firestore.collection<WorkoutExercise>(`Workouts/${workoutId}/Workout-Exercise-List`)
      .valueChanges({ idField: 'id' }) 
      .pipe(
        map(exercises => exercises as WorkoutExercise[])
      );
  }

}
