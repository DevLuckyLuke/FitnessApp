import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorlComponent } from './hello-worl.component';

describe('HelloWorlComponent', () => {
  let component: HelloWorlComponent;
  let fixture: ComponentFixture<HelloWorlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloWorlComponent]
    });
    fixture = TestBed.createComponent(HelloWorlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
