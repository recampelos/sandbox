import { Injectable } from '@angular/core';
import { SimulatorStore } from './../store/simulator-store.service';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { TaskDataService } from './task-data.service';
import { Action } from './../share/models/shared.models';

@Injectable()
export class SimulatorActionsDataService {

  private actionExecution = new Action<{type: string, payload: any}>({type: '', payload: null});

  actionExecution$ = this.actionExecution.action$;

  actions$ = this.store.state$.pipe(
    map(state => state.get('inEditMode') as boolean),
    switchMap(inEditMode => inEditMode ? this.taskData.editModeActions$ : this.taskData.viewModeActions$)
  )

  constructor(private store: SimulatorStore, private taskData: TaskDataService) {
    this.actionExecution$.pipe(
      filter(action => action.type === 'inEditMode'),
      tap((action) => this.store.updateStateProperty(action.type, action.payload))
    )
  }

  executeAction(action: {type: string, payload: any}) {
    this.actionExecution.execute(action);
  }
}
