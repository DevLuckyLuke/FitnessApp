import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../Services/exercise.service';
import { WorkoutService } from '../Services/workout.service';
import { Exercise } from '../Model/exercise.model';
import { CardioWorkoutExercise } from '../Model/cardio-workout-exercise';

@Component({
  selector: 'app-select-cardio-exercise',
  templateUrl: './select-cardio-exercise.component.html',
  styleUrls: ['./select-cardio-exercise.component.css']
})
export class SelectCardioExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise: Exercise | null = null;
  km: number | null = null;
  time: number | null = null;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.exerciseService.getCardioExercises().subscribe(
      (exercises) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addExercise() {
    if (this.selectedExercise && this.km !== null && this.time !== null) {
      const newWorkoutExercise: CardioWorkoutExercise = {
        name: this.selectedExercise.title,
        km: this.km,
        time: this.time,
        calories: this.calculateCalories(),
        category: "Cardio"
      };
  
      const workoutId = this.workoutService.getCurrentWorkoutId();
      if (workoutId !== null) {
        this.workoutService.addCardioExerciseToWorkout(workoutId, newWorkoutExercise).then(() => {
          this.router.navigate(['/NewWorkout']);
        }).catch(error => {
          console.error('Error adding exercise to workout: ', error);
        });
      } else {
        console.error('No active workout ID found');
        this.router.navigate(['/Home']);
      }
    } else {
      console.error('Incomplete form data');
    }
  }

  calculateCalories(): number {
    if (this.km === null || this.time === null) {
      return 0;
    }

    const averageCaloriesPerMinute = 8; // This is an assumed average, modify as needed
    const caloriesBurned = averageCaloriesPerMinute * this.time;

    return caloriesBurned;
  }
}



