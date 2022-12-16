import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {StepsModule} from 'primeng/steps';
import {DividerModule} from 'primeng/divider';
import {SkeletonModule} from 'primeng/skeleton';
import {MultiSelectModule} from 'primeng/multiselect';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator.component';
import { GeneralConditionsComponent } from './features/general-conditions/general-conditions.component';


@NgModule({
  declarations: [
    SimulatorComponent,
    GeneralConditionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimulatorRoutingModule,
    StepsModule,
    DividerModule,
    SkeletonModule,
    MultiSelectModule,
    FieldsetModule,
    DropdownModule
  ]
})
export class SimulatorModule { }
