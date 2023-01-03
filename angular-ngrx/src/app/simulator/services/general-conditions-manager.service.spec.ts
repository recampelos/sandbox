import { TestBed } from '@angular/core/testing';

import { GeneralConditionsManagerService } from './general-conditions-manager.service';

describe('GeneralConditionsManagerService', () => {
  let service: GeneralConditionsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralConditionsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
