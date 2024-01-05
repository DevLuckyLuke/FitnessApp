import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
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
    return this.firestore.collection<StrengthWorkoutExercise>(`Workouts/${workoutId}/Workout-Exercise-List`, ref =>
    ref.where('category', '==', 'Strength')
    ).valueChanges({ idField: 'id' }) 
      .pipe(
        map(exercises => exercises as StrengthWorkoutExercise[])
      );
  }

  addCardioExerciseToWorkout(workoutId: string, exercise: CardioWorkoutExercise): Promise<void> {
    return this.firestore.collection(`Workouts/${workoutId}/Workout-Exercise-List`).add(exercise).then(() => {});
  }

  // Methode, um Cardio-Übungen aus einem Workout zu erhalten
  getCardioExercisesFromWorkout(workoutId: string): Observable<CardioWorkoutExercise[]> {
    return this.firestore.collection<CardioWorkoutExercise>(`Workouts/${workoutId}/Workout-Exercise-List`, ref =>
      ref.where('category', '==', 'Cardio')
    ).valueChanges({ idField: 'id' }) 
      .pipe(
        map(exercises => exercises as CardioWorkoutExercise[])
      );
  }

  /*getAllCardioExercises(): Observable<CardioWorkoutExercise[]> {
    return this.firestore.collectionGroup<CardioWorkoutExercise>('Workout-Exercise-List')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(exercises => exercises as CardioWorkoutExercise[])
      );
  }*/

  getCardioExercisesFromLastDays(selectedTimespan: number): Observable<CardioWorkoutExercise[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedTimespan);
    
    // First, get the workouts within the last seven days
    return this.firestore.collection('Workouts', ref => 
      ref.where('date', '>=', startDate)
         .orderBy('date', 'desc')
    )
    .valueChanges({ idField: 'workoutId' }) // Include the document ID in the results
    .pipe(
      switchMap(workouts => {
        // For each workout, get the Workout-Exercise-List subcollection
        const exerciseListObservables = workouts.map(workout => 
          this.getCardioExercisesFromWorkout(workout.workoutId)
        );
        
        // Combine all the Workout-Exercise-List observables into one
        return exerciseListObservables.length
          ? combineLatest(exerciseListObservables).pipe(
              map(exerciseLists => exerciseLists.flat()) // Flatten the array of arrays
            )
          : of([]); // If there are no workouts, return an empty array
      })
    );
  }

  getStrengthExercisesFromLastDays(selectedTimespan: number): Observable<StrengthWorkoutExercise[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedTimespan);
    
    // First, get the workouts within the last seven days
    return this.firestore.collection('Workouts', ref => 
      ref.where('date', '>=', startDate)
         .orderBy('date', 'desc')
    )
    .valueChanges({ idField: 'workoutId' }) // Include the document ID in the results
    .pipe(
      switchMap(workouts => {
        // For each workout, get the Workout-Exercise-List subcollection
        const exerciseListObservables = workouts.map(workout => 
          this.getStrengthExercisesFromWorkout(workout.workoutId)
        );
        
        // Combine all the Workout-Exercise-List observables into one
        return exerciseListObservables.length
          ? combineLatest(exerciseListObservables).pipe(
              map(exerciseLists => exerciseLists.flat()) // Flatten the array of arrays
            )
          : of([]); // If there are no workouts, return an empty array
      })
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
