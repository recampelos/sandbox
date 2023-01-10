import { TestBed } from '@angular/core/testing';

import { SimulatorStepsDataService } from './simulator-steps-data.service';

describe('SimulatorStepsDataService', () => {
  let service: SimulatorStepsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulatorStepsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
