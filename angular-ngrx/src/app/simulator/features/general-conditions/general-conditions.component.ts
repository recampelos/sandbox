import { Observable } from 'rxjs';
import { of, withLatestFrom } from 'rxjs';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TechnicalSheetVisibility } from '../../models/simulator.models';

export interface Item {
  code: string,
  description: string
}

@Component({
  selector: 'app-general-conditions',
  templateUrl: './general-conditions.component.html',
  styleUrls: ['./general-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralConditionsComponent {

  formGroup: FormGroup;

  visibility$: Observable<TechnicalSheetVisibility | undefined>;

  constructor(private fb: FormBuilder, private store: SimulatorComponentStore) {
    this.formGroup = fb.nonNullable.group({});
    this.visibility$ = store.technicalSheetVisibility$;

    store.generalConditionsFrom$.pipe(
      map((form) => {
        return {subLimitCode: form.subLimit, productCode: form.subLimit, technicalSheetCode: ''}
      }),
      tap(data => store.loadTechnicalSheetVisibility$(of(data)))
    ).subscribe();
  }

  register({name, formControl}: {name: string, formControl: FormControl}) {
    this.formGroup.addControl(name, formControl);
  }

  unregister({name, formControl}: {name: string, formControl: FormControl}) {
    this.formGroup.removeControl(name);
  }

  save() {
    this.store.updateGeneralConditions$();
  }
}
