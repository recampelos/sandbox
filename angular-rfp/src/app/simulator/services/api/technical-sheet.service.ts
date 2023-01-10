import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable()
export class TechnicalSheetService {

  loadTechnicalSheet$ = (tsNumber: string) => of(tsNumber).pipe(
    filter(tsNumber => tsNumber !== ''),
    switchMap(tsNumber => this.http.get('assets/ts/data.json'))
  )

  constructor(private http: HttpClient) { }
}
