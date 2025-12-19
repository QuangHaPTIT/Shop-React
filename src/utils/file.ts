export const byteSizeStep = 1024;

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = byteSizeStep;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFileType = (file: File): string | null => {
  const fileName = file.name;
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  
  if (!extension) return null;
  
  return extension;
};

const fileUtils = {
  byteSizeStep,
  formatFileSize,
  getFileType,
};

export default fileUtils;

