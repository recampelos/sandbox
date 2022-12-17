import { GeneralConditionsForm, TechnicalSheet, TechnicalSheetVisibility } from "../models/simulator.models";

export interface SimulatorState {
  technicalSheet?: TechnicalSheet;
  technicalSheetVisibility?: TechnicalSheetVisibility;
  generalConditionsForm: GeneralConditionsForm;
  isEditable: boolean;
}

export const initialState: SimulatorState = {
  generalConditionsForm: {
    amount: null,
    amountUnit: null,
    product: null,
    subLimit: null
  },
  isEditable: false,
  technicalSheet: undefined,
  technicalSheetVisibility: undefined
}

export const simulatorFeature = 'simulator';
