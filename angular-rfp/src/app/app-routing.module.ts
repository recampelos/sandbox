import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'simulator', loadChildren: () => import('./simulator/simulator.module').then(m => m.SimulatorModule) },
  { path: '**', redirectTo: 'simulator' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
