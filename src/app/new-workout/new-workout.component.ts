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
  
  constructor(private workoutService: WorkoutService) {}

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
    } else {
      console.error('No valid workout ID found');
      // Geeignete Fehlerbehandlung hier
    }
  }
  

}
