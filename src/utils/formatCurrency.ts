interface Props {
  amount: number;
  locale: string;
}

function formatCurrency({ amount, locale }: Props) {
  return new Intl.NumberFormat(locale).format(amount);
}

export default formatCurrency;
