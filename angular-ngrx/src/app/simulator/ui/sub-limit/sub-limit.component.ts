import { GeneralConditionsForm } from './../../models/simulator.models';
import { SimulatorState } from './../../store/simulator.store';
import { distinctUntilChanged, from, map, Observable, pluck } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CatalogServiceService } from '../../services/catalog-service.service';
import { CodeDecription } from '../../shared/models/shared.models';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-sub-limit',
  templateUrl: './sub-limit.component.html',
  styleUrls: ['./sub-limit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubLimitComponent extends BaseComponent implements OnInit {

  subLimitValue$: Observable<string>;

  subLimits$: Observable<CodeDecription[]>;

  constructor(private fb: FormBuilder, private store: SimulatorComponentStore, private catalog: CatalogServiceService) {
    super('subLimits', fb, store);
    this.subLimitValue$ = this.store.generalConditionsFrom$.pipe(
      map((from) => from?.subLimit),
      distinctUntilChanged()
    );
    this.subLimits$ = this.catalog.getSubLimits();
  }

  override ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => this.store.setState((state: SimulatorState) => {
      return {...state, generalConditionsForm: {...state.generalConditionsForm, subLimit: value}};
    }));
    this.subLimitValue$.subscribe({
      next: (value) => this.formControl.setValue(value, {emitEvent: false})
    });

    super.ngOnInit();
  }
}
