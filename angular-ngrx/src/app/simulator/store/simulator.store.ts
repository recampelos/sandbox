import { GeneralConditionsForm, TechnicalSheet, TechnicalSheetVisibility } from "../models/simulator.models";

export interface SimulatorState {
  technicalSheet: TechnicalSheet | {};
  technicalSheetVisibility: TechnicalSheetVisibility | {};
  generalConditionsForm: GeneralConditionsForm | {};
  isEditable: boolean;
}

export const initialState: SimulatorState = {
  generalConditionsForm: {},
  isEditable: false,
  technicalSheet: {},
  technicalSheetVisibility: {}
}

export const simulatorFeature = 'simulator';
