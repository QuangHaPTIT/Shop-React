import type { ReactNode } from 'react';

export interface UploadProps {
  value?: File | File[] | null;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number;
  label?: string;
  height?: string;
  uploadIcon?: ReactNode;
  errorMessages?: {
    fileSizeLimit?: string;
    fileTypeNotAccepted?: string;
  };
  className?: string;
  onChange?: (value: File | File[] | null) => void;
  onFileAdded?: (file: File) => void;
  onFileRemoved?: (file: File) => void;
  onError?: (error: string) => void;
  onClearAll?: () => void;
  // Slots
  uploadIconSlot?: ReactNode;
  uploadMessageSlot?: ReactNode;
  uploadButtonSlot?: (props: {
    triggerFileInput: (e?: React.MouseEvent) => void;
    preventDefaultTrigger: (e: React.MouseEvent) => void;
  }) => ReactNode;
  uploadIconSmallSlot?: ReactNode;
}

