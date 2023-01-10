import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLimitComponent } from './sub-limit.component';

describe('SubLimitComponent', () => {
  let component: SubLimitComponent;
  let fixture: ComponentFixture<SubLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
