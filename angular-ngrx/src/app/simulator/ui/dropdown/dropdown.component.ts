import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Observable } from 'rxjs';
import { CodeDecription } from '../../shared/models/shared.models';
import { FormBuilder } from '@angular/forms';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { SimulatorState } from '../../store/simulator.store';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent extends BaseComponent<string> {

  @Input()
  values$: Observable<CodeDecription[]> | undefined;

  constructor(override fb: FormBuilder, override store: SimulatorComponentStore) {
    super(fb, store)
  }

}
