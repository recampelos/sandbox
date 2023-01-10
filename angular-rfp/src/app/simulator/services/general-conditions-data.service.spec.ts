import { TestBed } from '@angular/core/testing';

import { GeneralConditionsDataService } from './general-conditions-data.service';

describe('GeneralConditionsDataService', () => {
  let service: GeneralConditionsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralConditionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
