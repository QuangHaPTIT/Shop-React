export type TextareaResizable = boolean | 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps {
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  maxlength?: number;
  resizable?: TextareaResizable;
  showCharCount?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyup?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeydown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeypress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface TextareaComponentProps {
  label: string;
  textareaProps: TextareaProps;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

