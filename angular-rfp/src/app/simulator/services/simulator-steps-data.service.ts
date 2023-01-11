import { Injectable } from '@angular/core';
import { SimulatorStore } from '../store/simulator-store.service';
import { map } from 'rxjs/operators';
import { TechnicalSheetVisibilityDataService } from './technical-sheet-visibility-data.service';

@Injectable()
export class SimulatorStepsDataService {

  generalConditionsStepVisibility$ = this.visibility.visibility$.pipe(
    map(data => data.generalConditions),
    map(gcVisibility => this.isStepVisible(gcVisibility))
  )

  stepsVisibility$ = this.generalConditionsStepVisibility$.pipe(
    map(visible => ({generalConditions: visible}))
  );

  constructor(private visibility: TechnicalSheetVisibilityDataService) { }

  private isStepVisible(step: any) {
    return Object.keys(step).some(key => step[key].visible)
  }
}
