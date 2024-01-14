import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../Services/workout.service';
import { StrengthWorkoutExercise } from '../Model/strength-workout-exercise.model';
import { Workout } from '../Model/workout.model';
import { CardioWorkoutExercise } from '../Model/cardio-workout-exercise';

/*
  Made with the help of ChatGPT
*/

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  exercises: (CardioWorkoutExercise | StrengthWorkoutExercise)[] = [];
  workoutId: string = ''; 
  workoutName: string = ""; 
  temporaryExercises: (CardioWorkoutExercise | StrengthWorkoutExercise)[] = [];
  temporaryWorkoutName: string = '';
  
  constructor(private workoutService: WorkoutService, private router: Router ) {}

  

  ngOnInit() {
    this.loadTemporaryExercises();
    this.loadCurrentWorkoutName();
  }

  saveWorkout() {
    const exercises = this.workoutService.getTemporaryExercises();
    if (exercises.length > 0) {
      this.workoutService.saveWorkout(this.temporaryWorkoutName, exercises).then(() => {
        console.log('Workout erfolgreich gespeichert');
        this.workoutService.clearTemporaryExercises();
         this.workoutService.clearTemporaryWorkoutName();
        this.router.navigate(['/Workouts']);
      }).catch(error => {
        console.error('Fehler beim Speichern des Workouts:', error);
      });
    } else {
      console.error('Keine Übungen hinzugefügt');
    }
  }
  

  addExercise(exercise: CardioWorkoutExercise | StrengthWorkoutExercise) {
    if (!this.isExerciseAlreadyAdded(exercise)) {
      this.temporaryExercises.push(exercise);
    }
  }
 
  
  private isExerciseAlreadyAdded(exerciseToAdd: CardioWorkoutExercise | StrengthWorkoutExercise): boolean {
    return this.exercises.some(exercise => exercise.name === exerciseToAdd.name);
  }
  

  loadTemporaryExercises() {
    this.temporaryExercises = this.workoutService.getTemporaryExercises();
    this.temporaryWorkoutName = this.workoutService.getTemporaryWorkoutName();
  }

  loadCurrentWorkoutName() {
    this.temporaryWorkoutName = this.workoutService.getTemporaryWorkoutName();
  }

  setWorkoutName() {
    this.workoutService.setTemporaryWorkoutName(this.temporaryWorkoutName);
  }
  
  

}