import { Component } from '@angular/core';

@Component({
  selector: 'app-select-cardio-exercise',
  templateUrl: './select-cardio-exercise.component.html',
  styleUrls: ['./select-cardio-exercise.component.css']
})
export class SelectCardioExerciseComponent {
  selectedExercise: any; // Typ anpassen, je nachdem, was Ihre Übungen sind
  km: number | null = null;
  time: number | null = null;
  exercises = [
    // Hier Ihre Übungsdaten einfügen, z.B.:
    { title: 'Jogging', value: 'jogging' },
    { title: 'Radfahren', value: 'cycling' }
    // Weitere Übungen...
  ];

  addExercise() {
    // Logik zum Hinzufügen der Übung
    console.log(this.selectedExercise, this.km, this.time);
  }
}
