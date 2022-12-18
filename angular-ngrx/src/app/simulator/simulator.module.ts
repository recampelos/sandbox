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
import { SubLimitComponent } from './ui/sub-limit/sub-limit.component';
import { CatalogServiceService } from './services/catalog-service.service';
import { ProductComponent } from './ui/product/product.component';


@NgModule({
  declarations: [
    SimulatorComponent,
    GeneralConditionsComponent,
    SubLimitComponent,
    ProductComponent
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
    TechnicalSheetService
  ]
})
export class SimulatorModule { }
