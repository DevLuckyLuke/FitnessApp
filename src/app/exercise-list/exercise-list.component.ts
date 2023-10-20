import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  constructor(public firestore: AngularFirestore){  }

  ngOnInit(): void {
    this.ListContent();
  }

  exercisepost: Observable<any> | undefined;
  exercise_collection: AngularFirestoreCollection<'Exercises'> | undefined;


  ListContent(){
    this.exercise_collection = this.firestore.collection('Exercises');
    this.exercisepost = this.exercise_collection.valueChanges();
  }

  RemoveExercise(exercise: HTMLHeadElement){
    const title = exercise.innerText;
    this.firestore.collection('Exercises').doc(title).delete();
  }


}
