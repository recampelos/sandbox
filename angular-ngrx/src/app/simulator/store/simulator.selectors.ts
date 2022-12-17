import { createFeatureSelector, createSelector } from '@ngrx/store';
import { simulatorFeature, SimulatorState } from './simulator.store';

const featureSelector = createFeatureSelector<SimulatorState>(simulatorFeature);

export const technicalSheetSelector = createSelector(
  featureSelector,
  (state) => state.technicalSheet
);

export const technicalVisibilitySheetSelector = createSelector(
  featureSelector,
  (state) => state.technicalSheetVisibility
);

export const isEditableSeletor = createSelector(
  featureSelector,
  (state) => state.isEditable
);

export const generalCOnditionsFormSelector = createSelector(
  featureSelector,
  (state) => state.generalConditionsForm
);
