export interface CodeDecription {
  code: string;
  description: string;
}

export interface ValueUnit<T> {
  value: T;
  unit: string;
}

export interface FieldVisibility {
  visible: boolean;
  readonly: boolean;
}
