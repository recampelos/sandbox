import { TestBed } from '@angular/core/testing';

import { RouterParamsService } from './router-params.service';

describe('RouterParamsService', () => {
  let service: RouterParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
