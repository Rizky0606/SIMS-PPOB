const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
  currency: 'IDR',
  style: 'currency',
});

export const formatCurrency = (number: any) => {
  return CURRENCY_FORMATTER.format(number);
};
