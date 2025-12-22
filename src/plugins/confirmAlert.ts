// plugins/confirmAlert.ts
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import i18n from './i18n';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  type?: 'danger' | 'warning' | 'info' | 'success';
}

export const confirmDialog = (options: ConfirmOptions) => {
  const {
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    type = 'info',
  } = options;

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'react-confirm-alert-button-group button-danger';
      case 'warning':
        return 'react-confirm-alert-button-group button-warning';
      case 'success':
        return 'react-confirm-alert-button-group button-success';
      default:
        return 'react-confirm-alert-button-group';
    }
  };

  confirmAlert({
    title: title || i18n.t('confirm.title'),
    message: message,
    buttons: [
      {
        label: cancelText || i18n.t('confirm.info.cancelText'),
        onClick: onCancel || (() => {}),
        className: 'react-confirm-alert-button react-confirm-alert-button-cancel',
      },
      {
        label: confirmText || i18n.t('confirm.info.confirmText'),
        onClick: async () => {
          await onConfirm();
        },
        className: `react-confirm-alert-button react-confirm-alert-button-confirm ${getButtonClass()}`,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    overlayClassName: 'react-confirm-alert-overlay',
  });
};

export const confirmDelete = (
  message: string,
  onConfirm: () => void | Promise<void>
) => {
  confirmDialog({
    title: i18n.t('labels.confirm.delete.title'),
    message: message || i18n.t('labels.confirm.delete.message'),
    confirmText: i18n.t('labels.confirm.delete.confirmText'),
    cancelText: i18n.t('labels.confirm.delete.cancelText'),
    type: 'danger',
    onConfirm,
  });
};

export const confirmWarning = (
  message: string,
  onConfirm: () => void | Promise<void>
) => {
  confirmDialog({
    title: i18n.t('labels.confirm.warning.title'),
    message: message || i18n.t('labels.confirm.warning.message'),
    confirmText: i18n.t('labels.confirm.warning.confirmText'),
    cancelText: i18n.t('labels.confirm.warning.cancelText'),
    type: 'warning',
    onConfirm,
  });
};

export const confirmInfo = (
  message: string,
  onConfirm: () => void | Promise<void>
) => {
  confirmDialog({
    title: i18n.t('labels.confirm.info.title'),
    message: message || i18n.t('labels.confirm.info.message'),
    confirmText: i18n.t('labels.confirm.info.confirmText'),
    cancelText: i18n.t('labels.confirm.info.cancelText'),
    type: 'info',
    onConfirm,
  });
};