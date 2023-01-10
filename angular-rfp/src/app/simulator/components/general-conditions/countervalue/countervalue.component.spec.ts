import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountervalueComponent } from './countervalue.component';

describe('CountervalueComponent', () => {
  let component: CountervalueComponent;
  let fixture: ComponentFixture<CountervalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountervalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountervalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
