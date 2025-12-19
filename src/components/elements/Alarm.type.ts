export type AlarmType = 'success' | 'warning' | 'info' | 'error';

export interface AlarmProps {
  type?: AlarmType;
  title?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

