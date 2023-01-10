import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-general-conditions',
  templateUrl: './general-conditions.component.html',
  styleUrls: ['./general-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralConditionsComponent {

  formGroup: FormGroup = this.fb.nonNullable.group({});

  constructor(private fb: FormBuilder) {
    this.formGroup.valueChanges.subscribe(console.log);
  }
}
