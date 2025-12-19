export type DividerLabelPosition = 'start' | 'center' | 'end';

export interface HrClass {
  left?: string;
  right?: string;
  vertical?: string;
}

export interface DividerProps {
  hrClass?: HrClass | string;
  label?: string;
  labelPosition?: DividerLabelPosition;
  labelClass?: string;
  vertical?: boolean;
}

