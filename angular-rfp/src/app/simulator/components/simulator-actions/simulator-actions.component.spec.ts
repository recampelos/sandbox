import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorActionsComponent } from './simulator-actions.component';

describe('SimulatorActionsComponent', () => {
  let component: SimulatorActionsComponent;
  let fixture: ComponentFixture<SimulatorActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
