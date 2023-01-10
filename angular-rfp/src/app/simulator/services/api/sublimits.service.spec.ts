import { TestBed } from '@angular/core/testing';

import { SublimitsService } from './sublimits.service';

describe('SublimitsService', () => {
  let service: SublimitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SublimitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
