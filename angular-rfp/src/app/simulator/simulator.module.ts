import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator.component';
import { GeneralConditionsComponent } from './components/general-conditions/general-conditions.component';
import { SubLimitsService } from './services/api/sublimits.service';
import { GeneralConditionsActionsService } from './services/general-conditions-actions.service';
import { GeneralConditionsDataService } from './services/general-conditions-data.service';
import { MaterialModule } from '../material.module';
import { SubLimitComponent } from './components/general-conditions/sub-limit/sub-limit.component';
import { ProductComponent } from './components/general-conditions/product/product.component';
import { AmountComponent } from './components/general-conditions/amount/amount.component';
import { CounterValueComponent } from './components/general-conditions/countervalue/countervalue.component';
import { ActionsService } from './share/services/actions.service';
import { SimulatorStepsComponent } from './components/simulator-steps/simulator-steps.component';
import { SimulatorActionsComponent } from './components/simulator-actions/simulator-actions.component';
import { ConfigurationsService } from './services/api/configurations.service';
import { SimulatorStore } from './store/simulator-store.service';
import { RouterParamsService } from './services/router-params.service';
import { TechnicalSheetDataService } from './services/technical-sheet-data.service';
import { TechnicalSheetService } from './services/api/technical-sheet.service';
import { TaskDataService } from './services/task-data.service';
import { TaskService } from './services/api/task.service';
import { TechnicalSheetVisibilityDataService } from './services/technical-sheet-visibility-data.service';
import { SimulatorActionsDataService } from './services/simulator-actions-data.service';


@NgModule({
  declarations: [
    SimulatorComponent,
    GeneralConditionsComponent,
    SubLimitComponent,
    ProductComponent,
    AmountComponent,
    CounterValueComponent,
    SimulatorStepsComponent,
    SimulatorActionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SimulatorRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    SubLimitsService,
    GeneralConditionsActionsService,
    GeneralConditionsDataService,
    ActionsService,
    ConfigurationsService,
    SimulatorStore,
    RouterParamsService,
    TechnicalSheetVisibilityDataService,
    TechnicalSheetDataService,
    TechnicalSheetService,
    TaskService,
    TaskDataService,
    SimulatorActionsDataService
  ]
})
export class SimulatorModule { }
