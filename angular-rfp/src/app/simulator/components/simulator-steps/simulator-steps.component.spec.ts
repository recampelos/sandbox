import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorStepsComponent } from './simulator-steps.component';

describe('SimulatorStepsComponent', () => {
  let component: SimulatorStepsComponent;
  let fixture: ComponentFixture<SimulatorStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
