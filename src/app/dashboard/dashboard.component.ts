import { Component } from '@angular/core';
import { CardioWorkoutExercise } from '../Model/cardio-workout-exercise';
import { WorkoutService } from '../Services/workout.service';
import { Observable } from 'rxjs';
import { CardioStats } from '../Model/dashboard_dtos/cardio-stats.model';
import { StrengthWorkoutExercise } from '../Model/strength-workout-exercise.model';
import { StrengthStats } from '../Model/dashboard_dtos/strength-stats.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedCategory: string = '';
  selectedTimespan: number = 30;
  cardioStats: CardioStats | undefined;
  strengthStats: StrengthStats | undefined;

  constructor(private workoutService: WorkoutService) {}

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.reloadStats();
  }

  onTimespanChange(event: any) {
    this.selectedTimespan = event.target.value;
    this.reloadStats();
  }

  reloadStats() {
    if (this.selectedCategory === 'Cardio') {
      this.getCardioStats();
    } else if (this.selectedCategory === 'Strength') {
      this.getStrengthStats();
    }
  }

  getCardioStats() {
    this.workoutService.getCardioExercisesFromLastDays(this.selectedTimespan)
      .subscribe((exercises: CardioWorkoutExercise[]) => {
        const sumOfCalories = exercises.reduce((totalCalories, exercise) => {
          if (exercise.calories !== undefined) {
            return totalCalories + exercise.calories;
          }
          return totalCalories;
        }, 0);
        const distance = exercises.reduce((totalDistance, exercise) => {
          if (exercise.km !== undefined) {
            return totalDistance + exercise.km;
          }
          return totalDistance;
        }, 0);
        const averageTime = exercises.reduce((totalTime, exercise) => {
          return totalTime + (exercise.time !== undefined ? exercise.time : 0);
        }, 0) / exercises.length;

        let cardioStats: CardioStats = {
          calories: sumOfCalories,
          distance: distance,
          time: averageTime
        };
        this.cardioStats = cardioStats;
      });
  }

  getStrengthStats() {
    console.log('Strength stats');
    this.workoutService.getStrengthExercisesFromLastDays(this.selectedTimespan)
      .subscribe((exercises: StrengthWorkoutExercise[]) => {
        const sumOfCalories = exercises.reduce((totalCalories, exercise) => {
          if (exercise.calories !== undefined) {
            return totalCalories + exercise.calories;
          }
          return totalCalories;
        }, 0);
        const averageWeight = exercises.reduce((totalWeight, exercise) => {
          if (exercise.weight !== undefined) {
            return totalWeight + exercise.weight;
          }
          return totalWeight;
        }, 0) / exercises.length;
        const averageReps = exercises.reduce((totalReps, exercise) => {
            return totalReps + (exercise.set1 !== undefined ? exercise.set1 : 0) + (exercise.set2 !== undefined ? exercise.set2 : 0) + (exercise.set3 !== undefined ? exercise.set3 : 0);
        }, 0) / exercises.length;

        console.log('Sum of calories: ', sumOfCalories);
        console.log('Average weight: ', averageWeight);
        console.log('Average reps: ', averageReps);
        let strengthStats: StrengthStats = {
          calories: sumOfCalories,
          avgWeight: averageWeight,
          avgReps: averageReps
        };
        this.strengthStats = strengthStats;
    });

  }
}
