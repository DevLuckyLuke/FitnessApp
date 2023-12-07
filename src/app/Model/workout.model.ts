import { Timestamp } from "@firebase/firestore-types";
import { WorkoutExercise } from './workout-exercise.model'; // Pfad anpassen, falls nötig

export interface Workout {
  name: string;
  date: Date; // oder Date, falls Sie Date-Objekte verwenden
  user: string; // User-ID oder -name
  exercises: WorkoutExercise[]; // Eine Liste von WorkoutExercise
}
