import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GeneralConditionsDataService } from './../../../services/general-conditions-data.service';
import { GeneralConditionsActionsService } from './../../../services/general-conditions-actions.service';
import { ActionsService } from './../../../share/services/actions.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const FORM_CONTROL_KEY: string = 'amount';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountComponent implements OnInit, OnDestroy{
  @Input()
  formGroup: FormGroup = this.fb.nonNullable.group({});

  formControl: FormControl = this.fb.nonNullable.control('', []);

  visibility$ = this.data.generalConditionsVisibility$.pipe(
    map(data => data.amount)
  );

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
      this.formControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => this.actions.updateAmount.execute(value));
  }

  ngOnDestroy(): void {
      this.destroy.next();
  }
}
