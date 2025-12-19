import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { UploadProps } from './Upload.type';
import Button from './Button';
import XMarkIcon from '../icons/XMarkIcon';
import fileUtils from '../../utils/file';

const Upload: React.FC<UploadProps> = ({
  value,
  accept = '',
  multiple = false,
  disabled = false,
  maxSize = 10 * fileUtils.byteSizeStep * fileUtils.byteSizeStep,
  errorMessages,
  label = '',
  height = 'auto',
  uploadIcon,
  className,
  onChange,
  onFileAdded,
  onFileRemoved,
  onError,
  onClearAll,
  uploadIconSlot,
  uploadMessageSlot,
  uploadButtonSlot,
  uploadIconSmallSlot,
}) => {
  const id = `upload-${Math.random().toString(36).substring(2, 9)}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Safely convert value to File[]
  const getInitialFiles = useCallback((): File[] => {
    if (Array.isArray(value)) {
      return [...value];
    }
    if (value instanceof File) {
      return [value];
    }
    return [];
  }, [value]);

  useEffect(() => {
    setFiles(getInitialFiles());
  }, [value, getInitialFiles]);

  const updateModel = useCallback(
    (newFiles: File[]) => {
      setFiles(newFiles);
      if (onChange) {
        onChange(multiple ? newFiles : newFiles[0] || null);
      }
    },
    [multiple, onChange]
  );

  const validateFile = useCallback(
    (file: File): boolean => {
      setError('');

      // Validate file size
      if (file.size > maxSize) {
        const errorMsg =
          errorMessages?.fileSizeLimit ||
          `File size exceeds the limit of ${fileUtils.formatFileSize(maxSize)}`;
        setError(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
        return false;
      }

      // Validate file type if accept is specified
      if (accept && accept.length > 0) {
        const fileType = file.type;
        const fileName = file.name;
        const acceptValues = accept.split(',').map((type) => type.trim());

        const isAccepted = acceptValues.some((acceptValue) => {
          if (acceptValue.startsWith('.')) {
            // Check file extension
            const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
            return extension === acceptValue.toLowerCase();
          } else if (acceptValue.includes('*')) {
            // Check MIME type pattern (e.g., image/*)
            const [category, subtype] = acceptValue.split('/');
            const [fileCategory, fileSubtype] = fileType.split('/');
            return (
              category === fileCategory && (subtype === '*' || subtype === fileSubtype)
            );
          } else {
            return fileType === acceptValue;
          }
        });

        if (!isAccepted) {
          const errorMsg =
            errorMessages?.fileTypeNotAccepted || 'File type is not accepted';
          setError(errorMsg);
          if (onError) {
            onError(errorMsg);
          }
          return false;
        }
      }

      return true;
    },
    [accept, maxSize, errorMessages, onError]
  );

  const triggerFileInput = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      fileInputRef.current?.click();
    },
    []
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      if (!input.files || input.files.length === 0) return;

      const newFiles = Array.from(input.files);
      processFiles(newFiles);

      // Reset input so that selecting the same file again triggers the change event
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    []
  );

  const processFiles = useCallback(
    (newFiles: File[]) => {
      if (!multiple && files.length > 0) {
        // Replace the current file in single mode
        setFiles([]);
      }

      let validFiles: File[] = [];

      for (const file of newFiles) {
        if (validateFile(file)) {
          validFiles.push(file);
          if (onFileAdded) {
            onFileAdded(file);
          }
        }
      }

      if (validFiles.length > 0) {
        updateModel([...files, ...validFiles]);
      }
    },
    [files, multiple, validateFile, onFileAdded, updateModel]
  );

  const removeFile = useCallback(
    (index: number, e?: React.MouseEvent) => {
      // Prevent event bubbling up to the label
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      const removedFile = files[index];
      const newFiles = [...files];
      newFiles.splice(index, 1);
      updateModel(newFiles);
      if (onFileRemoved) {
        onFileRemoved(removedFile);
      }
    },
    [files, updateModel, onFileRemoved]
  );

  const clearAllFiles = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      updateModel([]);
      if (onClearAll) {
        onClearAll();
      }
    },
    [updateModel, onClearAll]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (!e.dataTransfer?.files || disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [disabled, processFiles]
  );

  const handleLabelClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
      }
    },
    [disabled]
  );

  const preventDefaultTrigger = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const labelClasses = [
    'w-full block border-2 border-gray-400 border-dashed rounded-md p-5 cursor-pointer transition-all duration-200 bg-gray-50 min-h-[100px]',
    !disabled && 'hover:border-primary-blue hover:text-primary-blue',
    disabled && 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300',
    isDragging && 'border-primary bg-opacity-5',
    error && 'border-red-500',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`w-full ${className || ''}`}>
      <label
        htmlFor={id}
        className={labelClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleLabelClick}
      >
        {/* No files selected state */}
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="mb-3 text-gray-500">
              {uploadIconSlot || uploadIcon}
            </div>
            {uploadMessageSlot || (
              <div className="text-gray-700 mb-4">
                <p>{!multiple ? label || 'Upload a file' : label || 'Upload files'}</p>
              </div>
            )}
            {uploadButtonSlot ? (
              uploadButtonSlot({ triggerFileInput, preventDefaultTrigger })
            ) : (
              <Button
                variant="filled"
                className="bg-white !text-primary border-1 border-gray-400 hover:!bg-white disabled:!bg-gray-100 disabled:!text-gray-400"
                disabled={disabled}
                onClick={triggerFileInput}
              >
                Select file
              </Button>
            )}
          </div>
        ) : (
          /* Files selected state */
          <div className="w-full flex flex-col">
            {/* Small upload hint at the top */}
            <div className="flex items-center mb-3 text-xs text-gray-500">
              {uploadIconSmallSlot || uploadIcon}
              {uploadMessageSlot || (
                <span className="ml-1">
                  {multiple ? 'Upload files' : 'Upload a file'}
                </span>
              )}

              {/* Clear all button for multiple mode */}
              {multiple && !disabled && (
                <button
                  type="button"
                  className="ml-auto text-xs text-primary-blue hover:underline"
                  onClick={clearAllFiles}
                  onMouseDown={preventDefaultTrigger}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* File list */}
            <div
              className="space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1 flex-grow"
              style={{
                maxHeight: height !== 'auto' ? height : 'none',
                overflowY: height !== 'auto' ? 'auto' : 'visible',
              }}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded border border-gray-200 bg-white"
                >
                  <div className="flex items-center max-w-[calc(100%-30px)]">
                    {fileUtils.getFileType(file) && (
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mr-2 text-xs text-gray-500 flex-shrink-0">
                        <span>{fileUtils.getFileType(file)?.toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {fileUtils.formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  {!disabled && (
                    <button
                      type="button"
                      className="p-1 text-gray-500 hover:text-primary-blue hover:bg-gray-100 rounded transition-colors"
                      onClick={(e) => removeFile(index, e)}
                      aria-label="Remove file"
                      onMouseDown={preventDefaultTrigger}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Select file button at the bottom */}
            <div className="flex justify-center mt-4">
              {uploadButtonSlot ? (
                uploadButtonSlot({ triggerFileInput, preventDefaultTrigger })
              ) : (
                <Button
                  variant="filled"
                  className="bg-white !text-primary border-1 border-gray-400 hover:!bg-white disabled:!bg-gray-100 disabled:!text-gray-400"
                  disabled={disabled}
                  onClick={triggerFileInput}
                >
                  {multiple ? 'Select more files' : 'Select file'}
                </Button>
              )}
            </div>
          </div>
        )}
      </label>

      <input
        id={id}
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
      />

      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default Upload;

