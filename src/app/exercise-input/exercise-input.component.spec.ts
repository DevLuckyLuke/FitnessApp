import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInputComponent } from './exercise-input.component';

describe('ExerciseInputComponent', () => {
  let component: ExerciseInputComponent;
  let fixture: ComponentFixture<ExerciseInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseInputComponent]
    });
    fixture = TestBed.createComponent(ExerciseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
