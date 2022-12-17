import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {GeneralConditionsForm, TechnicalSheet, TechnicalSheetVisibility} from "../models/simulator.models";

@Injectable({
  providedIn: 'root'
})
export class TechnicalSheetService {

  constructor() { }

  getTechnicalSheet(code: string): Observable<TechnicalSheet> {
    return of<TechnicalSheet>({
      code: String(Date.now()),
      generalConditions: {
        amount: {
          value: 2000,
          unit: 'EUR'
        },
        product: {
          code: '001',
          description: 'Product 1'
        },
        subLimit: {
          code: '001',
          description: 'SubLimit 1'
        }
      }
    }).pipe(delay(2000))
  }

  getTechnicalSheetVisibility(subLimitCode: string, productCode: string, technicalSheetCode?: string): Observable<TechnicalSheetVisibility> {
    return of<TechnicalSheetVisibility>({
      amount: {
        readonly: false,
        visible: true
      },
      product: {
        readonly: false,
        visible: true
      },
      subLimit: {
        readonly: false,
        visible: true
      }
    }).pipe(delay(2000));
  }

  updateGeneralConditions(data: GeneralConditionsForm): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }
}
