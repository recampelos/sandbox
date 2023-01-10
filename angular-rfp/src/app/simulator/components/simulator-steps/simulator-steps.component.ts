import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimulatorStepsDataService } from './../../services/simulator-steps-data.service';

@Component({
  selector: 'app-simulator-steps',
  templateUrl: './simulator-steps.component.html',
  styleUrls: ['./simulator-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorStepsComponent {

  constructor(public data:SimulatorStepsDataService) {}
}
