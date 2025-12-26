export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

export const formatNumber = (number: number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
};

export const formatNumberToTwoDecimal = (number: number) => {
    return number.toFixed(2);
};

export const formatNumberToRound = (number: number) => {
    return Math.round(number).toFixed(0);
};