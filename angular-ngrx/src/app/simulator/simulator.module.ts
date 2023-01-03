import { TechnicalSheetService } from './services/technical-sheet.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {StepsModule} from 'primeng/steps';
import {DividerModule} from 'primeng/divider';
import {SkeletonModule} from 'primeng/skeleton';
import {MultiSelectModule} from 'primeng/multiselect';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';

import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator.component';
import { GeneralConditionsComponent } from './features/general-conditions/general-conditions.component';
import {SimulatorComponentStore} from "./store/simulator.component.store";
import { CatalogServiceService } from './services/catalog-service.service';
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import { GeneralConditionsManagerService } from './services/general-conditions-manager.service';


@NgModule({
  declarations: [
    SimulatorComponent,
    GeneralConditionsComponent,
    DropdownComponent
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
    DropdownModule,
    ButtonModule
  ],
  providers: [
    SimulatorComponentStore,
    CatalogServiceService,
    TechnicalSheetService,
    GeneralConditionsManagerService
  ]
})
export class SimulatorModule { }
