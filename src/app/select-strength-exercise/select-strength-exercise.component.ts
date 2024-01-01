import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../Services/exercise.service';
import { WorkoutService } from '../Services/workout.service'; // Importieren Sie den WorkoutService
import { Exercise } from '../Model/exercise.model';
import { WorkoutExercise } from '../Model/workout-exercise.model'; // Importieren Sie das WorkoutExercise-Modell

@Component({
  selector: 'app-select-strength-exercise',
  templateUrl: './select-strength-exercise.component.html',
  styleUrls: ['./select-strength-exercise.component.css']
})
export class SelectStrengthExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise: Exercise | null = null; // initialisieren Sie es als null
  set1: number | null = null;
  set2: number | null = null;
  set3: number | null = null;
  weight: number | null = null;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService, // Fügen Sie den WorkoutService hinzu
    private router: Router
  ) {}

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(
      (exercises) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addExercise() {
    if (this.selectedExercise && this.set1 && this.set2 && this.set3 && this.weight) {
      const newWorkoutExercise: WorkoutExercise = {
        name: this.selectedExercise.title, 
        set1: this.set1,
        set2: this.set1,
        set3: this.set1,
        weight: this.weight
      };
  
      const workoutId = this.workoutService.getCurrentWorkoutId();
      if (workoutId !== null) { 
        this.workoutService.addExerciseToWorkout(workoutId, newWorkoutExercise).then(() => {
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
}
