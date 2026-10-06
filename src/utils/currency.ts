import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateAgainstUSD: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rateAgainstUSD: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rateAgainstUSD: 0.78, label: 'GBP (£)' },
  CAD: { code: 'CAD', symbol: 'CA$', rateAgainstUSD: 1.36, label: 'CAD ($)' },
};

export function formatPrice(priceUSD: number, currency: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = priceUSD * config.rateAgainstUSD;
  return `${config.symbol}${converted.toFixed(2)}`;
}
