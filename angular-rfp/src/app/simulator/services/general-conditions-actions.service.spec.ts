import { TestBed } from '@angular/core/testing';

import { GeneralConditionsActionsService } from './general-conditions-actions.service';

describe('GeneralConditionsActionsService', () => {
  let service: GeneralConditionsActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralConditionsActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
