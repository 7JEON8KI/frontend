interface Props {
  amount?: number;
  locale?: keyof typeof currencyUnit;
}

const currencyUnit = {
  "ko-KR": "원",
  "en-US": "$",
};

function formatCurrency({ amount = 0, locale = "ko-KR" }: Props) {
  if (amount === undefined) return "";
  return new Intl.NumberFormat(locale).format(amount) + currencyUnit[locale];
}

export default formatCurrency;
