export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};

export const formatDateToISO = (dateString: string) => {
    return new Date(dateString).toISOString();
};

export const formatDateToLocale = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};
