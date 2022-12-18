import { Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CodeDecription } from '../shared/models/shared.models';

@Injectable()
export class CatalogServiceService {

  constructor() { }

  getSubLimits(): Observable<CodeDecription[]> {
    return of<CodeDecription[]>(mockData.subLimits);
  }

  getProducts(subLimit: string): Observable<CodeDecription[]> {
    return of(mockData.products).pipe(
      map((products) => (subLimit === 'CC') ? products.CC : products.CCP)
    );
  }
}

const mockData = {
  subLimits: [
    {code: 'CCP', description:'Creadito Curto Prazo'},
    {code: 'CC', description:'Cartões de Credito'}
  ],
  products: {
    CCP: [
      {code: '001', description:'Product1'},
      {code: '002', description:'Product2'}
    ],
    CC: [
      {code: '003', description:'Product3'},
      {code: '004', description:'Product4'}
    ]
  }
}
