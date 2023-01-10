import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeneralConditionsDataService } from './../../../services/general-conditions-data.service';
import { GeneralConditionsActionsService } from './../../../services/general-conditions-actions.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActionsService } from './../../../share/services/actions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const FORM_CONTROL_KEY: string = 'product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input()
  formGroup: FormGroup = this.fb.nonNullable.group({});

  formControl: FormControl = this.fb.nonNullable.control('', []);

  private destroy: Subject<void> = new Subject<void>();

  constructor(
    public data: GeneralConditionsDataService, 
    public actions: GeneralConditionsActionsService, 
    private fb: FormBuilder,
    private sharedActions: ActionsService) {}

  ngOnInit(): void {
      this.formGroup.addControl(FORM_CONTROL_KEY, this.formControl);
      this.sharedActions.resetData.action$.pipe(takeUntil(this.destroy)).subscribe(() => this.formControl.reset('', {emitEvent: false}));
      this.formControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => this.actions.updateProductAction.execute(value));
  }

  ngOnDestroy(): void {
      this.destroy.next();
  }
}
