import { WorkoutExercise } from './workout-exercise.model'; // Pfad anpassen, falls nötig

export interface Workout {
  date: string; // oder Date, falls Sie Date-Objekte verwenden
  user: string; // User-ID oder -name
  exercises: WorkoutExercise[]; // Eine Liste von WorkoutExercise
}
