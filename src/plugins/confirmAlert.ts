// plugins/confirmAlert.ts
import React from 'react';
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

  confirmAlert({
    closeOnEscape: true,
    closeOnClickOutside: true,
    customUI: ({ onClose }: { onClose: () => void }) => {
      return React.createElement(
        'div',
        {
          className: 'react-confirm-alert-overlay',
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          onClick: (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }
        },
        React.createElement(
          'div',
          {
            className: 'bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4',
            onClick: (e: React.MouseEvent) => e.stopPropagation()
          },
          React.createElement(
            'h1',
            { className: 'text-xl font-semibold text-gray-900 mb-2' },
            title || i18n.t('confirm.title')
          ),
          React.createElement(
            'p',
            { className: 'text-gray-700 mb-6' },
            message
          ),
          React.createElement(
            'div',
            { className: 'flex justify-between gap-3' },
            React.createElement(
              'button',
              {
                className: 'px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm h-11',
                onClick: () => {
                  onCancel?.();
                  onClose();
                },
              },
              cancelText || i18n.t('confirm.info.cancelText')
            ),
            React.createElement(
              'button',
              {
                className: `px-6 py-2.5 ${
                  type === 'danger' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : type === 'warning'
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : type === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded-lg font-medium transition-colors text-sm h-11`,
                onClick: async () => {
                  await onConfirm();
                  onClose();
                },
              },
              confirmText || i18n.t('confirm.info.confirmText')
            )
          )
        )
      );
    },
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
    title: i18n.t('labels.confirm.title'),
    message: message || i18n.t('labels.confirm.info.message'),
    confirmText: i18n.t('labels.confirm.info.confirmText'),
    cancelText: i18n.t('labels.confirm.info.cancelText'),
    type: 'info',
    onConfirm,
  });
};