import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { Timestamp } from "@firebase/firestore-types";
import { Workout } from '../Model/workout.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Exercise } from '../exercise-input/exercise-input.component';


/*
  Made with the help of ChatGPT
*/
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})

/*
  Made with the help of Github copilot
*/
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  workoutsSubscription: Subscription = new Subscription;

  pagedWorkouts: Workout[] = [];
  pageIndex = 0;
  pageSize = 5;


  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) {}

  ngOnInit(): void {

    this.workoutsSubscription = this.firestore.collection<Workout>('Workouts', ref => ref.orderBy('date', 'desc'))
    .valueChanges().subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
      this.updatePagedWorkouts();
    });

    
  }

  ngOnDestroy(): void {
    this.workoutsSubscription.unsubscribe();
  }

  formattedWorkoutDate(obj: object): string {
    const date = (obj as Timestamp).toDate();
    let formattedDate = this.datePipe.transform(date, 'dd.MMM.yyyy HH:mm') ?? "";
    return formattedDate;
  }

  onWorkoutClick(workout: Workout): void {
    console.log(this.workouts.length);
  }

  deleteWorkout(workout: Workout): void {
    this.firestore.collection('Workouts')
    .ref
    .where('name', '==', workout.name)
    .where('date', '==', workout.date)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedWorkouts();
  }

  updatePagedWorkouts() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedWorkouts = this.workouts.slice(start, end);
  }
}
