import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Workout } from '../models/workout.model';
import { DatePipe } from '@angular/common';
import { Timestamp } from "@firebase/firestore-types";

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) {}

  ngOnInit(): void {
    //suggested by copilot
    this.firestore.collection<Workout>('WorkoutTest').valueChanges().subscribe((workouts: Workout[]) => {
      console.log("UPDATED WORKOUTS")
      this.workouts = workouts;
      
      console.log("WORKOUTS: " + this.workouts.toString());
    });
  }

  formattedWorkoutDate(date: Timestamp): string {
    let formattedDate = this.datePipe.transform(date.toDate(), 'dd.MMM.yyyy HH:mm') ?? "";
    return formattedDate;
  }

  onWorkoutClick(workout: Workout): void {
    console.log("WORKOUT CLICKED: " + workout.toString());
  }
}
