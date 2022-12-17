import { createAction, props } from '@ngrx/store';
import { GeneralConditionsForm, TechnicalSheet, TechnicalSheetVisibility } from '../models/simulator.models';


export const loadTechnicalSheetAction = createAction(
  '[Simulator] Load technical sheet',
  props<{ts: TechnicalSheet}>()
);

export const loadTechnicalSheetVisibilityAction = createAction(
  '[Simulator] Load technical sheet',
  props<{visibility: TechnicalSheetVisibility}>()
);

export const updateGeneralConditionsFormAction = createAction(
  '[Simulator] Load technical sheet',
  props<{formData: GeneralConditionsForm}>()
);

export const submitGeneralConditionsFormAction = createAction(
  '[Simulator] Load technical sheet',
  props<{formData: GeneralConditionsForm}>()
);

export const enableEditAction = createAction(
  '[Simulator] Enable edit'
);

export const disableEditAction = createAction(
  '[Simulator] Disable edit'
);
