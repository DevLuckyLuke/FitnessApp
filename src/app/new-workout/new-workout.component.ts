import { Component } from '@angular/core';
import { Exercise } from '../Model/exercise.model';
import { ExerciseService } from '../Services/exercise.service';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent {

  exercises: Exercise[] = []; // Ihr Übungsmodell

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises(); // Laden der Übungen von Firebase
  }

  addExercise() {
    // Logik, um zur Select-Exercise-Komponente zu navigieren
  }
}
