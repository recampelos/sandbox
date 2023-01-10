import { TestBed } from '@angular/core/testing';

import { BaseFormFieldService } from './base-form-field.service';

describe('BaseFormFieldService', () => {
  let service: BaseFormFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFormFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
