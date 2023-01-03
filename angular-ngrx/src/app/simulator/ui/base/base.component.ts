import { Observable, of, map, combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { Component, OnInit, OnDestroy, Output, EventEmitter, InjectionToken, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SimulatorState } from '../../store/simulator.store';
import { ObjectUtil } from './../../util/object-util';
import { FieldVisibility } from '../../shared/models/shared.models';

export const stringInjectorToken = new InjectionToken<string>('stringInjectorToken');

@Component({
  template: ''
})
export class BaseComponent<T> implements OnInit, OnDestroy{
  @Input()
  label: string = '';

  @Input()
  formName: string = '';

  @Input()
  value$: Observable<T> | undefined;

  @Input()
  visibility$: Observable<FieldVisibility | undefined> = of<FieldVisibility>({
    visible: true,
    readonly: false
  });

  @Input()
  updateFn: ((value: T) => void) | undefined;

  @Output()
  register: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  @Output()
  unregister: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  formGroup: FormGroup = this.fb.nonNullable.group({});

  formControl: FormControl = this.fb.nonNullable.control('');

  visible$ = this.visibility$.pipe(
    map(v => v?.visible)
  );

  readOnly$ = this.visibility$.pipe(
    map(v => v?.readonly)
  );

  constructor(protected fb: FormBuilder, protected store: SimulatorComponentStore) {}

  ngOnInit(): void {
    this.formControl = this.fb.nonNullable.control(this.formName);
    this.formGroup.addControl(this.formName, this.formControl);
    this.formControl.valueChanges.subscribe((value) => {
      if (this.updateFn) {
        this.updateFn(value);
      }
    });

    combineLatest([this.store.isEditable$, this.readOnly$]).pipe(
      map(([isEditable, readonly]) => isEditable || readonly)
    ).subscribe((disabled) => disabled ? this.formControl.enable() : this.formControl.disable());

    this.value$?.subscribe((value) => this.formControl.patchValue(value, {emitEvent: false}));

    this.register.next({name: this.formName, formGroup: this.formGroup});
  }

  ngOnDestroy(): void {
    this.unregister.next({name: this.formName, formGroup: this.formGroup});
  }
}
