import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, NEVER, of } from 'rxjs'
import { shareReplay, catchError, filter, switchMap, distinctUntilChanged } from 'rxjs/operators'
import { TechnicalSheetVisibility } from '../../models/technical-sheet-visibility.models';
import { CodeDescription } from '../../share/models/shared.models';
import { ActionsService } from './../../share/services/actions.service';

@Injectable()
export class SubLimitsService {


  subLimitsList$ = this.http.get<CodeDescription[]>('assets/sublimits/data.json').pipe(
    shareReplay(1)
  );

  subLimitProducts$ = (subLimitCode: string) => of<string>(subLimitCode).pipe(
    filter(subLimitCode => subLimitCode !== ''),
    switchMap(subLimitCode => this.http.get<CodeDescription[]>(`assets/sublimits/${subLimitCode}/products/data.json`)),
    catchError(error => NEVER)
  );

  subLimitProductVisibility$ = (subLimitCode: string, productCode: string) => of<{subLimitCode: string, productCode: string}>({subLimitCode, productCode}).pipe(
    switchMap(({subLimitCode, productCode}) => 
      subLimitCode !== '' && productCode != '' ? 
        this.http.get<TechnicalSheetVisibility>(`assets/sublimits/${subLimitCode}/products/${productCode}/visibility/data.json`) :
        of({
          generalConditions: {
            amount: {visible: false, readOnly: false},
            counterValue: {visible: false, readOnly: false}
          }
        })
    )
  );

  constructor(private http: HttpClient) { }
}
