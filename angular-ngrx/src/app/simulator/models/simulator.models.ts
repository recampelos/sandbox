import {CodeDecription, FieldVisibility, ValueUnit} from "../shared/models/shared.models";

export interface TechnicalSheet {
  code: string;
  generalConditions: GeneralConditions;
}

export interface GeneralConditions {
  subLimit: CodeDecription;
  product: CodeDecription;
  amount: ValueUnit<number>;
}

export interface TechnicalSheetVisibility {
  subLimit: FieldVisibility;
  product: FieldVisibility;
  amount: FieldVisibility;
}

export interface GeneralConditionsForm {
  subLimit: string | null;
  product: string | null;
  amount: number | null;
  amountUnit: string | null;
}
