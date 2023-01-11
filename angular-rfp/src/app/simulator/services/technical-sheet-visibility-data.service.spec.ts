import { TestBed } from '@angular/core/testing';

import { TechnicalSheetVisibilityDataService } from './technical-sheet-visibility-data.service';

describe('TechnicalSheetVisibilityDataService', () => {
  let service: TechnicalSheetVisibilityDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalSheetVisibilityDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
