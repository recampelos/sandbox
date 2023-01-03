import { Observable } from 'rxjs';
import { of, withLatestFrom } from 'rxjs';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TechnicalSheetVisibility } from '../../models/simulator.models';
import { GeneralConditionsManagerService } from '../../services/general-conditions-manager.service';

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

  constructor(private fb: FormBuilder, public service: GeneralConditionsManagerService) {
    this.formGroup = fb.nonNullable.group({});
    
  }

  register({name, formControl}: {name: string, formControl: FormControl}) {
    this.formGroup.addControl(name, formControl);
  }

  unregister({name, formControl}: {name: string, formControl: FormControl}) {
    this.formGroup.removeControl(name);
  }

  save() {
    this.service.saveForm();
  }
}
