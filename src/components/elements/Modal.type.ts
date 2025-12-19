export interface ModalOkButtonProps {
  disabled?: boolean;
  [key: string]: any;
}

export interface ModalCancelButtonProps {
  disabled?: boolean;
  [key: string]: any;
}

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  okText?: string;
  okButtonProps?: ModalOkButtonProps;
  cancelButtonProps?: ModalCancelButtonProps;
  cancelText?: string;
  showFooter?: boolean;
  showHeader?: boolean;
  showClose?: boolean;
  width?: string;
  fullHeight?: boolean;
  isDefault?: boolean;
  closeOnClickOutside?: boolean;
  closeOnOk?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerExtra?: React.ReactNode;
  headerButtons?: React.ReactNode;
  footerLeft?: React.ReactNode;
  footerButtons?: React.ReactNode;
  className?: string;
}

