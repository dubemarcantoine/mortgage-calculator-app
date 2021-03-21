export interface ComputedMortgage {
  numberOfPayments: number;
  paymentAmount: number;
  prepaymentAmount: number;
  principalPaymentsTotal: number;
  interestPaymentsTotal: number;
  total: number;
}
