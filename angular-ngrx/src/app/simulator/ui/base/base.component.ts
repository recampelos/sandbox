import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { SimulatorComponentStore } from './../../store/simulator.component.store';
import { Component, OnInit, OnDestroy, Output, EventEmitter, InjectionToken, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export const stringInjectorToken = new InjectionToken<string>('stringInjectorToken');

@Component({
  template: ''
})
export class BaseComponent<T> implements OnInit, OnDestroy{
  @Input()
  formName: string = '';

  @Input()
  value$: Observable<T> | undefined;

  @Output()
  register: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  @Output()
  unregister: EventEmitter<{name: string, formGroup: FormGroup}> = new EventEmitter<{name: string, formGroup: FormGroup}>();

  formGroup: FormGroup = this.fb.nonNullable.group({});

  formControl: FormControl = this.fb.nonNullable.control('');

  constructor(protected fb: FormBuilder, protected store: SimulatorComponentStore) {}

  ngOnInit(): void {
    this.formControl = this.fb.nonNullable.control(this.formName);
    this.formGroup.addControl(this.formName, this.formControl);

    this.store.isEditable$.pipe(distinctUntilChanged()).subscribe((isEditable) => isEditable ? this.formControl.enable() : this.formControl.disable());

    this.register.next({name: this.formName, formGroup: this.formGroup});
  }

  ngOnDestroy(): void {
    this.unregister.next({name: this.formName, formGroup: this.formGroup});
  }
}
