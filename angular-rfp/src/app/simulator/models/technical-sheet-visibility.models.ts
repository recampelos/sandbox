import { Visibility } from "../share/models/shared.models";

export interface GeneralConditionsVisibility {
    amount: Visibility,
    counterValue: Visibility
}

export interface TechnicalSheetVisibility {
    generalConditions: GeneralConditionsVisibility
}