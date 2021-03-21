import {TestBed} from '@angular/core/testing';

import {MortgageCalculatorService} from './mortgage-calculator.service';
import {YearMonth} from './models/year-month';
import {PaymentFrequency} from './models/payment-frequency.enum';
import {PrepaymentPlan} from './models/prepayment-plan';
import {PrepaymentFrequency} from './models/prepayment-frequency.enum';

describe('MortgageCalculatorService', () => {
  let service: MortgageCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageCalculatorService);
  });

  it('should calculate number of months of amortization period', () => {
    const yearMonth: YearMonth = {
      years: 10,
      months: 1,
    };
    expect(service.getAmortizationPeriodMonths(yearMonth)).toEqual(121);
  });

  it('should return yearly payments based on payment frequency', () => {
    expect(service.getYearlyPayments(PaymentFrequency.Monthly)).toEqual(12);
    expect(service.getYearlyPayments(PaymentFrequency.SemiMonthly)).toEqual(24);
    expect(service.getYearlyPayments(PaymentFrequency.BiWeekly)).toEqual(26);
    expect(service.getYearlyPayments(PaymentFrequency.AcceleratedBiWeekly)).toEqual(26);
    expect(service.getYearlyPayments(PaymentFrequency.Weekly)).toEqual(52);
    expect(service.getYearlyPayments(PaymentFrequency.AcceleratedWeekly)).toEqual(52);
  });

  it('should get the payment value for a given period', () => {
    expect(service.getPeriodPaymentsValue(100000, 4.5 / 100 / 12, 300)).toEqual(555.83);
  });

  it('should get the payment value for a given period accelerated bi-weekly', () => {
    expect(service.getAcceleratedBiWeeklyPaymentsValue(100000, 4.5 / 100 / 12, 300)).toEqual(277.92);
  });

  it('should get the payment value for a given period accelerated weekly', () => {
    expect(service.getAcceleratedWeeklyPaymentsValue(100000, 4.5 / 100 / 12, 300)).toEqual(138.96);
  });

  it('should return the payment principal', () => {
    spyOn(service, 'shouldApplyPrepayment').and.returnValue(false);
    expect(service.getPaymentPrincipal(100, 50, PaymentFrequency.Monthly, service.defaultPrepaymentPlan, 1)).toEqual(50);
  });

  it('should return the payment principal without pre-payment', () => {
    spyOn(service, 'shouldApplyPrepayment').and.returnValue(false);

    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.OneTime,
      prepaymentStartAt: 1,
    };
    expect(service.getPaymentPrincipal(100, 50, PaymentFrequency.Monthly, prepaymentPlan, 2)).toEqual(50);
  });

  it('should return the payment principal with pre-payment', () => {
    spyOn(service, 'shouldApplyPrepayment').and.returnValue(true);

    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.OneTime,
      prepaymentStartAt: 1,
    };
    expect(service.getPaymentPrincipal(100, 50, PaymentFrequency.Monthly, prepaymentPlan, 2)).toEqual(150);
  });

  it('should return the payment interest', () => {
    expect(service.getPaymentInterest(100000, 0.001)).toEqual(100);
  });

  it('should round amount values to nearest 2 decimals', () => {
    expect(service.getAmountValue(0.499)).toEqual(0.5);
    expect(service.getAmountValue(0.501)).toEqual(0.5);
    expect(service.getAmountValue(0.511)).toEqual(0.51);
    expect(service.getAmountValue(0.515)).toEqual(0.52);
  });

  it('should not apply prepayment for OneTime frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.OneTime,
      prepaymentStartAt: 2,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 1)).toBeFalsy();
  });

  it('should apply prepayment for OneTime frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.OneTime,
      prepaymentStartAt: 2,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 2)).toBeTruthy();
  });

  it('should not apply prepayment for Yearly frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.Yearly,
      prepaymentStartAt: 13,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 1)).toBeFalsy();
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 14)).toBeFalsy();
  });

  it('should apply prepayment for Yearly frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.Yearly,
      prepaymentStartAt: 13,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 13)).toBeTruthy();
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 25)).toBeTruthy();
  });

  it('should not apply prepayment for SameAsRegularPayment frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.SameAsRegularPayment,
      prepaymentStartAt: 2,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 1)).toBeFalsy();
  });

  it('should apply prepayment for SameAsRegularPayment frequency', () => {
    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100,
      prepaymentFrequency: PrepaymentFrequency.SameAsRegularPayment,
      prepaymentStartAt: 2,
    };
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 2)).toBeTruthy();
    expect(service.shouldApplyPrepayment(PaymentFrequency.Monthly, prepaymentPlan, 3)).toBeTruthy();
  });
});
