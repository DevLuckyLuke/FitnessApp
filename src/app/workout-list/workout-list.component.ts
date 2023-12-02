import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { Timestamp } from "@firebase/firestore-types";
import { Workout } from '../Model/workout.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  workoutsSubscription: Subscription = new Subscription;

  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.workoutsSubscription = this.firestore.collection<Workout>('Workouts').valueChanges().subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
      console.log("WORKOUTS UPDATED");
    });
  }

  ngOnDestroy(): void {
    this.workoutsSubscription.unsubscribe();
    console.log("WORKOUTS UNSUBSCRIBED");
  }

  formattedWorkoutDate(obj: object): string {
    const date = (obj as Timestamp).toDate();
    console.log("FORMATTING DATE: " + date);
    let formattedDate = this.datePipe.transform(date, 'dd.MMM.yyyy HH:mm') ?? "";
    return formattedDate;
  }

  onWorkoutClick(workout: Workout): void {
    console.log("WORKOUT CLICKED: " + workout.toString());
  }
}

/*


ngOnInit(): void {
    this.firestore.collection<Workout>('Workouts').valueChanges().subscribe((workouts: Workout[]) => {
      console.log("UPDATED WORKOUTS")
      this.workouts = workouts;
      this.workouts.forEach((workout: Workout) => {
        console.log("Workout name:"+workout.name);
        console.log("Workout date:"+workout.date.getDate);
      });
    });
  }


  ngOnInit(): void {
    this.firestore.collection<Workout>('Workouts').valueChanges().subscribe((workouts: Workout[]) => {
      console.log("UPDATED WORKOUTS")
      this.workouts = workouts.map(workout => {
        date: workout.date.toDate,
        
    });
  }

*/