import {YearMonth} from './year-month';
import {PaymentFrequency} from './payment-frequency.enum';

export interface PaymentPlan {
  mortgageAmount: number;
  interestRate: number;
  amortizationPeriod: YearMonth;
  paymentFrequency: PaymentFrequency;
  term: number;
}
