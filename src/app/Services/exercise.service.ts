import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Exercise } from '../Model/exercise.model';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private firestore: AngularFirestore) {}

  getExercises(): Observable<Exercise[]> {
    // Hier nutzen wir valueChanges(), aber Sie könnten auch snapshotChanges() verwenden,
    // wenn Sie zusätzliche Metadaten benötigen, wie z.B. die Dokumenten-ID
    return this.firestore.collection<Exercise>('Exercises').valueChanges({ idField: 'id' });
  }

  addExercise(exercise: Exercise): Promise<void> {
    const id = this.firestore.createId(); // Erzeugen einer einzigartigen ID für das neue Dokument
    return this.firestore.doc<Exercise>(`Exercises/${id}`).set(exercise);
  }

  // Weitere Methoden für Update oder Delete könnten hier hinzugefügt werden
}
