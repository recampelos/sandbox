import { GeneralConditionsForm, TechnicalSheet, TechnicalSheetVisibility } from "../models/simulator.models";

export interface SimulatorState {
  technicalSheet?: TechnicalSheet;
  technicalSheetVisibility?: TechnicalSheetVisibility;
  generalConditionsForm: GeneralConditionsForm;
  isEditable: boolean;
}

export const initialState: SimulatorState = {
  generalConditionsForm: {
    amount: 0,
    amountUnit: '',
    product: '',
    subLimit: ''
  },
  isEditable: true,
  technicalSheet: undefined,
  technicalSheetVisibility: undefined
}

export const simulatorFeature = 'simulator';
