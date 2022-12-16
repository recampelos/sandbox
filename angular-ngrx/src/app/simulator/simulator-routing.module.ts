import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulatorComponent } from './simulator.component';
import { GeneralConditionsComponent } from './features/general-conditions/general-conditions.component';

const routes: Routes = [
  { path: '', component: SimulatorComponent, children: [
    { path: 'general-conditions', component: GeneralConditionsComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulatorRoutingModule { }
