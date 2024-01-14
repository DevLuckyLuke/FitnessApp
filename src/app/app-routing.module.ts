import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { ExerciseInputComponent } from './exercise-input/exercise-input.component';
import { SelectStrengthExerciseComponent } from './select-strength-exercise/select-strength-exercise.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SelectCardioExerciseComponent } from './select-cardio-exercise/select-cardio-exercise.component';


//Syntax of Routing was advised by copilot
const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch:'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'ExerciseList', component: ExerciseListComponent},
  {path: 'NewWorkout', component: NewWorkoutComponent},
  {path: 'NewExercise', component: ExerciseInputComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'WorkoutList', component: WorkoutListComponent},
  {path: 'select-strength-exercise', component: SelectStrengthExerciseComponent },
  {path: 'select-cardio-exercise', component: SelectCardioExerciseComponent },
  {path: 'select-category', component: SelectCategoryComponent },
  {path: '**', redirectTo: '/Home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
