import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './Modal.type';
import Button from './Button';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = '',
  okText,
  okButtonProps,
  cancelButtonProps,
  cancelText,
  showFooter = true,
  showHeader = true,
  showClose = true,
  width,
  fullHeight = false,
  isDefault = true,
  closeOnClickOutside = true,
  closeOnOk = true,
  onClose,
  onOk,
  onCancel,
  children,
  header,
  footer,
  headerExtra,
  headerButtons,
  footerLeft,
  footerButtons,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trigger animation
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsContentVisible(true), 10);
      }, 10);
    } else {
      document.body.style.overflow = '';
      setIsContentVisible(false);
      setTimeout(() => setIsVisible(false), 200);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    if (closeOnOk) {
      closeModal();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      closeModal();
    }
  };

  if (!isOpen && !isVisible) {
    return null;
  }

  const modalContent = (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 overflow-auto bg-black/60 flex items-center justify-center p-4 ${
        isVisible
          ? 'transition ease-out duration-300 opacity-100'
          : 'transition ease-in duration-200 opacity-0'
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={contentRef}
        className={[
          'modal-content',
          'bg-white rounded-md shadow-xl transform',
          fullHeight ? 'h-[90vh]' : '',
          'mx-auto w-full',
          'max-h-[95vh] flex flex-col',
          className || '',
          isContentVisible
            ? 'transition ease-out duration-300 opacity-100 scale-100'
            : 'transition ease-in duration-200 opacity-0 scale-95',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          maxWidth: width || '45vw',
        } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showHeader && (
          <>
            {header ? (
              header
            ) : (
              <div className="px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  {headerExtra}
                </div>
                <div className="flex items-center gap-2">
                  {headerButtons}
                  {showClose && (
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                    >
                      <span className="text-xl font-bold">×</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Content */}
        <div
          className={[
            'px-6 py-4 overflow-y-auto',
            fullHeight ? 'flex-1' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <>
            {footer ? (
              footer
            ) : (
              <div className="px-6 py-4">
                <div className="flex pt-4 justify-between gap-3 border-t border-gray-200">
                  <div className="flex items-center gap-3">{footerLeft}</div>

                  <div className="flex items-center gap-3">
                    {footerButtons}
                    {cancelText !== '' && (
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        block={false}
                        disabled={cancelButtonProps?.disabled}
                      >
                        {cancelText || 'Cancel'}
                      </Button>
                    )}
                    <Button
                      onClick={handleOk}
                      variant="filled"
                      color="primary"
                      block={false}
                      disabled={okButtonProps?.disabled}
                    >
                      {okText || 'OK'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;

