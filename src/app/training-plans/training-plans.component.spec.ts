import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlansComponent } from './training-plans.component';

describe('TrainingPlansComponent', () => {
  let component: TrainingPlansComponent;
  let fixture: ComponentFixture<TrainingPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
