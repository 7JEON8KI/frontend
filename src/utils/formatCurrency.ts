interface Props {
  amount?: number;
  locale?: string;
}

function formatCurrency({ amount, locale }: Props) {
  if (amount === undefined) return "";
  return new Intl.NumberFormat(locale).format(amount);
}

export default formatCurrency;
