import { Injectable } from '@angular/core';
import { RouterParamsService } from './router-params.service';
import { filter, switchMap } from 'rxjs/operators';
import { TechnicalSheetService } from './api/technical-sheet.service';

@Injectable()
export class TechnicalSheetDataService {

  technicalSheet$ = this.routeParams.technicalSheetNumber$.pipe(
    filter(tsNumber => tsNumber && tsNumber !== ''),
    switchMap(tsNumber => this.technicalSheetApi.loadTechnicalSheet$(tsNumber))
  );

  constructor(private routeParams: RouterParamsService, private technicalSheetApi: TechnicalSheetService) { }
}
