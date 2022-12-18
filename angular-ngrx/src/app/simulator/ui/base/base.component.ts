import { distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { Component, OnInit, OnDestroy, Output, EventEmitter, InjectionToken, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export const stringInjectorToken = new InjectionToken<string>('stringInjectorToken');

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy{

  formGroup: FormGroup;

  formControl: FormControl;

  formName: string;

  registered = false;

  @Output()
  register: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  @Output()
  unregister: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  constructor(@Inject('stringInjectorToken') formName: string, fb: FormBuilder, store: SimulatorComponentStore) {
    this.formName = formName;
    this.formControl = fb.nonNullable.control(formName);
    this.formGroup = fb.nonNullable.group({})
    this.formGroup.addControl(formName, this.formControl);

    store.isEditable$.pipe(distinctUntilChanged()).subscribe((isEditable) => isEditable ? this.formControl.enable() : this.formControl.disable());
  }

  ngOnInit(): void {
    this.register.next({name: this.formName, formGroup: this.formGroup});

    setTimeout(() => this.registered = true, 500);
  }

  ngOnDestroy(): void {
    this.unregister.next({name: this.formName, formGroup: this.formGroup});
  }
}
