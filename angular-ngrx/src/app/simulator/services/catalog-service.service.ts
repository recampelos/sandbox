import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CodeDecription } from '../shared/models/shared.models';

@Injectable()
export class CatalogServiceService {

  constructor() { }

  getSubLimits(): Observable<CodeDecription[]> {
    return of<CodeDecription[]>(mockData.subLimits);
  }

  getProducts(subLimit: string): Observable<CodeDecription[]> {
    return of<CodeDecription[]>([...mockData.products[subLimit]]);
  }
}

const mockData = {
  subLimits: [
    {code: 'CCP', description:'Creadito Curto Prazo'},
    {code: 'CC', description:'Cartões de Credito'}
  ],
  products: {
    'CCP': [
      {code: '001', description:'Product1'},
      {code: '002', description:'Product2'}
    ],
    'CC': [
      {code: '003', description:'Product3'},
      {code: '004', description:'Product4'}
    ]
  }
}
