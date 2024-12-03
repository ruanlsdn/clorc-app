export const applyCurrencyMask = (text: string) => {
  const cleanValue = text.replace(/\D/g, '');
  const formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return formattedValue;
};

export const removeCurrencyMask = (maskedValue: string): number => {
  return parseFloat(
    maskedValue
      .replace(/[R$\s]/g, '')
      .replace(/\./g, '')
      .replace(',', '.'),
  );
};
