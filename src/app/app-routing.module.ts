import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { ExerciseInputComponent } from './exercise-input/exercise-input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';


//Syntax of paths was advised by copilot
const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch:'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'ExerciseList', component: ExerciseListComponent},
  {path: 'NewWorkout', component: NewWorkoutComponent},
  {path: 'NewExercise', component: ExerciseInputComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'WorkoutList', component: WorkoutListComponent},
  {path: '**', redirectTo: '/Home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
