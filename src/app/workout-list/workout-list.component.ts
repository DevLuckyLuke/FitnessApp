import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { Timestamp } from "@firebase/firestore-types";
import { Workout } from '../Model/workout.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  workoutsSubscription: Subscription = new Subscription;

  pagedWorkouts: Workout[] = [];
  pageIndex = 0;
  pageSize = 5;

  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.workouts = [];
    this.firestore.collection<Workout>('Workouts', ref => ref.orderBy('date', 'desc'))
      .get().toPromise().then(querySnapshot => {
        if (querySnapshot) {
          this.workouts = querySnapshot.docs.map(doc => doc.data() as Workout);
          this.workouts.forEach(workout => {
            console.log("Workout: " + workout.name + " " + workout.date);
          });
          console.log("Workouts loaded");
          this.updatePagedWorkouts();
          
        }
      });

/*
    this.workoutsSubscription = this.firestore.collection<Workout>('Workouts', ref => ref.orderBy('date', 'desc'))
    .valueChanges().subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
      this.updatePagedWorkouts();
    });
*/
    
  }

  ngOnDestroy(): void {
    this.workoutsSubscription.unsubscribe();
  }

  formattedWorkoutDate(obj: object): string {
    console.log("formattedWorkoutDate: " + obj.toString());
    const date = (obj as Timestamp).toDate();
    let formattedDate = this.datePipe.transform(date, 'dd.MMM.yyyy HH:mm') ?? "";
    return formattedDate;
  }

  onWorkoutClick(workout: Workout): void {
    console.log(this.workouts.length);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedWorkouts();
  }

  updatePagedWorkouts() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    console.log("start: " + start + " end: " + end);
    console.log("workouts.length: " + this.workouts.length);
    this.pagedWorkouts = this.workouts.slice(start, end);
  }
}
