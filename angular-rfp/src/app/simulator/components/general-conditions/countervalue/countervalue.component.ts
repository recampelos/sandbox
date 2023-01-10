import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GeneralConditionsDataService } from './../../../services/general-conditions-data.service';
import { GeneralConditionsActionsService } from './../../../services/general-conditions-actions.service';
import { ActionsService } from './../../../share/services/actions.service';

const FORM_CONTROL_KEY: string = 'counterValue';

@Component({
  selector: 'app-countervalue',
  templateUrl: './countervalue.component.html',
  styleUrls: ['./countervalue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterValueComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup = this.fb.nonNullable.group({});

  formControl: FormControl = this.fb.nonNullable.control('', []);

  visibility$ = this.data.generalConditionsVisibility$.pipe(
    map(data => data.counterValue)
  );

  vm$ = combineLatest([
    this.visibility$,
    this.data.calculateCounterValue$
  ]).pipe(
    map(([visibility, value]) => {return {visibility, value}})
  )

  private destroy: Subject<void> = new Subject<void>();

  constructor(
    public data: GeneralConditionsDataService, 
    public actions: GeneralConditionsActionsService, 
    private fb: FormBuilder,
    private sharedActions: ActionsService) {}

  ngOnInit(): void {
      this.formGroup.addControl(FORM_CONTROL_KEY, this.formControl);
      this.sharedActions.resetData.action$.pipe(takeUntil(this.destroy)).subscribe(() => this.formControl.reset('', {emitEvent: false}));
      this.visibility$.pipe(takeUntil(this.destroy)).subscribe(visibility => visibility.readOnly ? this.formControl.disable() : this.formControl.enable());
  }

  ngOnDestroy(): void {
      this.destroy.next();
  }
}
