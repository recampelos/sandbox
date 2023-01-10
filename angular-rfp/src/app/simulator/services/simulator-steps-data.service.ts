import { Injectable } from '@angular/core';
import { SimulatorDataService } from './simulator-data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SimulatorStepsDataService {

  generalConditionsStepVisibility$ = this.simulatorData.visibility$.pipe(
    map(data => data.generalConditions),
    map(gcVisibility => this.isStepVisible(gcVisibility))
  )

  stepsVisibility$ = this.generalConditionsStepVisibility$.pipe(
    map(visible => ({generalConditions: visible}))
  );

  constructor(private simulatorData: SimulatorDataService) { }

  private isStepVisible(step: any) {
    return Object.keys(step).some(key => step[key].visible)
  }
}
