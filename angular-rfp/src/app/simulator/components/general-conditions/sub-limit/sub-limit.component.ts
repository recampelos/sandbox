import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GeneralConditionsActionsService } from './../../../services/general-conditions-actions.service';
import { GeneralConditionsDataService } from './../../../services/general-conditions-data.service';
import { ActionsService } from './../../../share/services/actions.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

const FORM_CONTROL_KEY: string = 'subLimit';

@Component({
  selector: 'app-sub-limit',
  templateUrl: './sub-limit.component.html',
  styleUrls: ['./sub-limit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubLimitComponent implements OnInit, OnDestroy {

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
      this.formControl.valueChanges.pipe(tap(() => this.sharedActions.resetData.execute(null)), takeUntil(this.destroy)).subscribe(value => this.actions.updateSubLimitAction.execute(value));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
