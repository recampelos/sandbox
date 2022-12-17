import { loadTechnicalSheetAction, loadTechnicalSheetVisibilityAction, updateGeneralConditionsFormAction, enableEditAction, disableEditAction } from './simulator.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './simulator.store';


export const simulatorReducer = createReducer(
  initialState,

  on(loadTechnicalSheetAction, (state, {ts}) => {
    return {...state, technicalSheet: ts}
  }),

  on(loadTechnicalSheetVisibilityAction, (state, {visibility}) => {
    return {...state, technicalSheetVisibility: visibility};
  }),

  on(updateGeneralConditionsFormAction, (state, {formData}) => {
    return {...state, generalConditionsForm: {...state.generalConditionsForm, ...formData}};
  }),

  on(enableEditAction, (state) => {
    return {...state, isEditable: true};
  }),

  on(disableEditAction, (state) => {
    return {...state, isEditable: false};
  })
);
