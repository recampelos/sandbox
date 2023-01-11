import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const initialState: Map<string, any> = new Map();

@Injectable()
export class SimulatorStore {

  private state: BehaviorSubject<Map<string, any>> = new BehaviorSubject<Map<string, any>>(initialState);

  state$ = this.state.asObservable();

  constructor() { }

  setState(state: Map<string, any>) {
    this.state.next(state);
  }

  updateStateProperty(propertyKey: string, propertyValue: any): void {
    this.state.next({...this.state.value, [propertyKey]: propertyValue});
  }
}
