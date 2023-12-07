import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../Services/workout.service';
import { WorkoutExercise } from '../Model/workout-exercise.model';
import { Workout } from '../Model/workout.model';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  exercises: WorkoutExercise[] = [];
  workoutId: string = ''; // Die ID des Workouts
  workoutName: string = ""; // Der Name des Workouts
  
  constructor(private workoutService: WorkoutService, private router: Router ) {}

  ngOnInit() {
    const workoutId = this.workoutService.getCurrentWorkoutId();
    if (workoutId) {
      this.workoutService.getExercisesFromWorkout(workoutId)
        .subscribe(
          exercises => {
            this.exercises = exercises;
          },
          error => {
            console.error('Error loading exercises:', error);
          }
        );
      this.workoutService.getWorkoutName(workoutId)
        .subscribe(
          workoutName => {
            this.workoutName = workoutName;
          },
          error => {
            console.error('Error loading workout name:', error);
          }
        );
    } else {
      console.error('No valid workout ID found');
      // Geeignete Fehlerbehandlung hier
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
