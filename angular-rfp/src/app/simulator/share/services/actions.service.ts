import { Injectable } from '@angular/core';
import { Action } from './../models/shared.models';

@Injectable()
export class ActionsService {

  resetData = new Action<any>(null);

  constructor() { }
}
