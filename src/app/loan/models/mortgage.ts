import {ComputedMortgage} from './computedMortgage';
import {MortgagePayment} from './mortgage-payment';

export interface Mortgage {
  term: ComputedMortgage;
  amortized: ComputedMortgage;
  mortgagePayments: MortgagePayment[];
}
