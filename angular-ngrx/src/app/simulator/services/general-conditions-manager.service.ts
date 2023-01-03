import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, map, BehaviorSubject, combineLatest, distinctUntilChanged, filter, switchMap, tap, startWith, of } from 'rxjs';
import { SimulatorComponentStore } from '../store/simulator.component.store';
import { CatalogServiceService } from './catalog-service.service';
import { SimulatorState } from './../store/simulator.store';

@Injectable()
export class GeneralConditionsManagerService {

  technicalSheetCode$ = this.route.paramMap.pipe(
    map((params) => params.get('technicalSheet')),
    tap(technicalSheetCode => this.store.loadTechnicalSheet(of({technicalSheetCode})))
  )

  clientNumber$ = this.route.paramMap.pipe(
    map((params) => params.get('clientNumber'))
  )

  technicalSheet$ = this.store.technicalSheet$;

  generalConditions$ = this.technicalSheet$.pipe(
    map(ts => ts?.generalConditions)
  );

  generalConditionsForm$ = this.store.generalConditionsFrom$;

  subLimitFormValue$ = this.generalConditionsForm$.pipe(
    map(data => data.subLimit)
  );

  productFormValue$ = this.generalConditionsForm$.pipe(
    map(data => data.product)
  )

  subLimits$ = this.catalog.getSubLimits().pipe(
    map(data => [{code: '', description: 'Selecione Sub Limite'}, ...data])
  );

  products$ = this.subLimitFormValue$.pipe(
    filter(sl => sl !== ''),
    switchMap(sl => this.catalog.getProducts(sl).pipe(
      map(data => [{code: '', description: 'Selecione Produto'}, ...data])
    )),
  );

  visibility$ = combineLatest([
    this.subLimitFormValue$,
    this.productFormValue$
  ]).pipe(
    filter(([subLimitCode, productCode]) => subLimitCode !== '' && productCode !== ''),
    map(([subLimitCode, productCode]) => {return {subLimitCode, productCode, technicalSheetCode: ''}}),
    tap((data) => this.store.loadTechnicalSheetVisibility(data)),
    switchMap(() => this.store.technicalSheetVisibility$)
  );

  subLimitVisibility$ = this.visibility$.pipe(
    map(visibility => visibility?.subLimit)
  );

  productVisibility$ = this.visibility$.pipe(
    map(visibility => visibility?.subLimit)
  );

  constructor(private store: SimulatorComponentStore, 
    private catalog: CatalogServiceService,
    private route: ActivatedRoute) {
      this.store.state$.subscribe((state) => {console.log(state), console.log('---------------------------')});
    }

  saveForm() {
    this.store.updateGeneralConditions();
  }

  updateSubLimit = (value: string) => {
    this.store.setState((state: SimulatorState) => {
      return {...state, generalConditionsForm: {...state.generalConditionsForm, subLimit: value}}
    })
  }

  updateProduct = (value: string) => {
    this.store.setState((state: SimulatorState) => {
      return {...state, generalConditionsForm: {...state.generalConditionsForm, product: value}}
    })
  }
}
