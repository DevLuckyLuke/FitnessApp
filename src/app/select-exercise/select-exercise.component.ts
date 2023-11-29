import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../Services/exercise.service';
import { WorkoutService } from '../Services/workout.service'; // Importieren Sie den WorkoutService
import { Exercise } from '../Model/exercise.model';
import { WorkoutExercise } from '../Model/workout-exercise.model'; // Importieren Sie das WorkoutExercise-Modell

@Component({
  selector: 'app-select-exercise',
  templateUrl: './select-exercise.component.html',
  styleUrls: ['./select-exercise.component.css']
})
export class SelectExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise: Exercise | null = null; // initialisieren Sie es als null
  reps: number | null = null;
  sets: number | null = null;
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
    if (this.selectedExercise && this.reps && this.sets && this.weight) {
      const newWorkoutExercise: WorkoutExercise = {
        name: this.selectedExercise.title, // oder ein anderes Feld, das die Übung identifiziert
        repetition: this.reps,
        sets: this.sets,
        weight: this.weight
      };

      // Angenommen, Sie haben eine Workout-ID
      const workoutId = 'some-workout-id'; 
      this.workoutService.addExerciseToWorkout(workoutId, newWorkoutExercise).then(() => {
        this.router.navigate(['/new-workout']);
      }).catch(error => {
        console.error('Error adding exercise to workout: ', error);
      });
    } else {
      console.error('Incomplete form data');
    }
  }
}
