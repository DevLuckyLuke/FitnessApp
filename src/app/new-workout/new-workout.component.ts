import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../Services/workout.service';
import { StrengthWorkoutExercise } from '../Model/strength-workout-exercise.model';
import { Workout } from '../Model/workout.model';
import { CardioWorkoutExercise } from '../Model/cardio-workout-exercise';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  exercises: (CardioWorkoutExercise | StrengthWorkoutExercise)[] = [];
  workoutId: string = ''; // Die ID des Workouts
  workoutName: string = ""; // Der Name des Workouts
  
  constructor(private workoutService: WorkoutService, private router: Router ) {}

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    const workoutId = this.workoutService.getCurrentWorkoutId();
    if (workoutId) {
      // Laden Sie sowohl Cardio- als auch Strength-Übungen und fügen Sie sie zur Liste hinzu
      this.workoutService.getCardioExercisesFromWorkout(workoutId).subscribe(
        cardioExercises => {
          this.exercises = [...this.exercises, ...cardioExercises];
        },
        error => console.error('Error loading cardio exercises:', error)
      );

      this.workoutService.getStrengthExercisesFromWorkout(workoutId).subscribe(
        strengthExercises => {
          this.exercises = [...this.exercises, ...strengthExercises];
        },
        error => console.error('Error loading strength exercises:', error)
      );
    } else {
      console.error('No valid workout ID found');
    }
  }

  setWorkoutName() {
    const workoutId = this.workoutService.getCurrentWorkoutId();
    if (workoutId) {
      this.workoutService.setWorkoutName(workoutId, this.workoutName)
        .then(() => {
          console.log('Workout name updated: ' + this.workoutName);
        })
        .catch(error => {
          console.error('Error updating workout name:', error);
        });
    } else {
      console.error('No valid workout ID found');
      // Geeignete Fehlerbehandlung hier
    }
  }
  

}
