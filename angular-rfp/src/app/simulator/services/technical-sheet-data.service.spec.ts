import { TestBed } from '@angular/core/testing';

import { TechnicalSheetDataService } from './technical-sheet-data.service';

describe('TechnicalSheetDataService', () => {
  let service: TechnicalSheetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalSheetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
