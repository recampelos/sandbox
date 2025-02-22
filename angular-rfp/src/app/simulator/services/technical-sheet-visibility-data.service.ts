import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { SubLimitsService } from './api/sublimits.service';
import { GeneralConditionsActionsService } from './general-conditions-actions.service';
import { debounceTime, switchMap, shareReplay } from 'rxjs/operators';

@Injectable()
export class TechnicalSheetVisibilityDataService {

  visibility$ = combineLatest([
    this.gcActions.updateProductAction.action$,
    this.gcActions.updateSubLimitAction.action$
  ]).pipe(
    debounceTime(100),
    switchMap(([productCode, subLimitCode]) => this.subLimitsApi.subLimitProductVisibility$(subLimitCode, productCode)),
    shareReplay(1)
  );

  constructor(private gcActions: GeneralConditionsActionsService, private subLimitsApi: SubLimitsService) { }
}
