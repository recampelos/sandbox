import { Injectable } from '@angular/core';
import { Action } from '../share/models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class GeneralConditionsActionsService {

  updateSubLimitAction = new Action<string>('');

  updateProductAction = new Action<string>('');

  updateAmount = new Action<number>(0);

  constructor() { }
}
