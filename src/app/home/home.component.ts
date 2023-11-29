import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../Services/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(
    private workoutService: WorkoutService,
    private router: Router 
  ) {}


  createNewWorkout() {
    this.workoutService.addWorkout()
      .then(() => {
        console.log('Neues Workout erstellt');
        
        this.router.navigate(['/new-workout']); 
      })
      .catch(error => {
        console.error('Fehler beim Erstellen des Workouts:', error);
      });
  }

}
