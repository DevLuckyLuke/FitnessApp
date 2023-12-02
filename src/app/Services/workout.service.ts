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
      name: '',
      date: new Date(),
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
