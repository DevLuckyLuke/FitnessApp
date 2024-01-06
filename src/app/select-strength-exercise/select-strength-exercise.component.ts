import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../Services/exercise.service';
import { WorkoutService } from '../Services/workout.service'; // Importieren Sie den WorkoutService
import { Exercise } from '../Model/exercise.model';
import { StrengthWorkoutExercise } from '../Model/strength-workout-exercise.model'; // Importieren Sie das WorkoutExercise-Modell

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
    this.exerciseService.getStrengthExercises().subscribe(
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
      const totalReps = this.set1 + this.set2 + this.set3;
      const caloriesBurned = this.calculateCalories(totalReps, this.weight);
  
      const newWorkoutExercise: StrengthWorkoutExercise = {
        name: this.selectedExercise.title,
        set1: this.set1,
        set2: this.set2,
        set3: this.set3,
        weight: this.weight,
        calories: caloriesBurned,
        category: "Strength"
      };
  
      // Fügen Sie die Übung zum temporären Array im Service hinzu
      this.workoutService.addTemporaryExercise(newWorkoutExercise);
      this.router.navigate(['/NewWorkout']);
    } else {
      console.error('Incomplete form data');
    }
  }
  
  
  calculateCalories(totalReps: number, weight: number) {
    // Eine einfache Formel zur Kalorienberechnung
    // Dies ist eine grobe Schätzung und nicht wissenschaftlich fundiert
    return (totalReps * weight) / 10;
  }
  
}
