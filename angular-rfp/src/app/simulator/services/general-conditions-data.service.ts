import { Injectable } from '@angular/core';

import { debounceTime, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators'

import { GeneralConditionsActionsService } from './general-conditions-actions.service';
import { SubLimitsService } from './api/sublimits.service';
import { combineLatest } from 'rxjs';
import { SimulatorDataService } from './simulator-data.service';

@Injectable()
export class GeneralConditionsDataService {

  subLimitsList$ = this.subLimitsApi.subLimitsList$;

  productsList$ = this.actions.updateSubLimitAction.action$.pipe(
    switchMap(subLimitCode => this.subLimitsApi.subLimitProducts$(subLimitCode)),
    tap(() => this.actions.updateProductAction.execute('')),
    tap(() => this.actions.updateAmount.execute(0))
  );

  generalConditionsVisibility$ = this.simulatorData.visibility$.pipe(
    map(data => data.generalConditions)
  );

  calculateCounterValue$ = this.actions.updateAmount.action$.pipe(
    startWith(0),
    map(value => value * 1.17)
  )

  constructor(private actions: GeneralConditionsActionsService, private subLimitsApi: SubLimitsService, private simulatorData: SimulatorDataService) { }
}
