import {PrepaymentFrequency} from './prepayment-frequency.enum';

export interface PrepaymentPlan {
  prepaymentAmount: number;
  prepaymentFrequency: PrepaymentFrequency;
  prepaymentStartAt: number;
}
