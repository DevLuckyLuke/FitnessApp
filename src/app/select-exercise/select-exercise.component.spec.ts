import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExerciseComponent } from './select-exercise.component';

describe('SelectExerciseComponent', () => {
  let component: SelectExerciseComponent;
  let fixture: ComponentFixture<SelectExerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectExerciseComponent]
    });
    fixture = TestBed.createComponent(SelectExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
