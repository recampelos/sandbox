import { SimulatorState } from './../../store/simulator.store';
import { switchMap } from 'rxjs';
import { Observable, map, distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { CatalogServiceService } from '../../services/catalog-service.service';
import { CodeDecription } from '../../shared/models/shared.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends BaseComponent implements OnInit {

  product$: Observable<string>;

  products$: Observable<CodeDecription[]>;

  constructor(private fb: FormBuilder, private store: SimulatorComponentStore, private catalog: CatalogServiceService) {
    super('product', fb, store);

    this.products$ = store.generalConditionsFrom$.pipe(
      map((form) => form?.subLimit),
      distinctUntilChanged(),
      switchMap((subLimitCode) => this.catalog.getProducts(subLimitCode))
    );

    this.product$ = this.store.generalConditionsFrom$.pipe(
      map((form) => form?.product),
      distinctUntilChanged()
    );
  }

  override ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this.store.setState((state: SimulatorState) => {
        return {...state, generalConditionsForm: {...state.generalConditionsForm, product: value}};
      })
    });

    this.product$.subscribe((value) => this.formControl.patchValue(value, {emitEvent: false}));

    super.ngOnInit();
  }
}
