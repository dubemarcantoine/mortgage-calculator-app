import {TestBed, waitForAsync} from '@angular/core/testing';

import {MortgageCalculatorService} from './mortgage-calculator.service';
import {YearMonth} from './models/year-month';
import {PaymentFrequency} from './models/payment-frequency.enum';
import {PrepaymentPlan} from './models/prepayment-plan';
import {PrepaymentFrequency} from './models/prepayment-frequency.enum';
import {PaymentPlan} from './models/payment-plan';

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

  it('should return the payment principal without pre-payment', () => {
    expect(service.getPaymentPrincipal(100, 50)).toEqual(50);
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

  it('should compute mortgage', waitForAsync(() => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: {
        years: 25,
        months: 0,
      },
      paymentFrequency: PaymentFrequency.Monthly,
      term: 5,
    };

    service.computeMortgage(paymentPlan).subscribe(res => {
      expect(res.mortgagePayments.length).toEqual(301);
      expect(res.amortized.principalPaymentsTotal).toEqual(paymentPlan.mortgageAmount);
      expect(res.amortized.interestPaymentsTotal).toEqual(75377.04);
      expect(res.amortized.total).toEqual(175377.04);
      expect(res.term.principalPaymentsTotal).toEqual(11419.82);
      expect(res.term.interestPaymentsTotal).toEqual(23655.58);
      expect(res.term.total).toEqual(35075.40);
    });
  }));

  it('should compute mortgage with prepayment', waitForAsync(() => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: {
        years: 25,
        months: 0,
      },
      paymentFrequency: PaymentFrequency.Monthly,
      term: 5,
    };

    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 250,
      prepaymentFrequency: PrepaymentFrequency.SameAsRegularPayment,
      prepaymentStartAt: 1,
    };

    service.computeMortgage(paymentPlan, prepaymentPlan).subscribe(res => {
      expect(res.mortgagePayments.length).toEqual(167);
      expect(res.amortized.prepaymentAmountTotal).toEqual(41500);
      expect(res.amortized.principalPaymentsTotal).toEqual(paymentPlan.mortgageAmount);
      expect(res.amortized.interestPaymentsTotal).toEqual(38825.94);
      expect(res.amortized.total).toEqual(138825.94);
      expect(res.term.prepaymentAmountTotal).toEqual(15000);
      expect(res.term.principalPaymentsTotal).toEqual(28421.34);
      expect(res.term.interestPaymentsTotal).toEqual(21654.06);
      expect(res.term.total).toEqual(50075.4);
    });
  }));

  it('should throw error because term bigger than amortization period', waitForAsync(() => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: {
        years: 1,
        months: 0,
      },
      paymentFrequency: PaymentFrequency.Monthly,
      term: 5,
    };

    service.computeMortgage(paymentPlan).subscribe(res => {
      // Make sure that the test fails if success callback is called
      expect(true).toBeFalsy();
    }, (error) => {
      expect(error).toEqual('The amortization period must be equal to or greater than the term');
    });
  }));


  it('should throw error because prepayment starts after amortization period', waitForAsync(() => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: {
        years: 25,
        months: 0,
      },
      paymentFrequency: PaymentFrequency.Monthly,
      term: 5,
    };

    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 250,
      prepaymentFrequency: PrepaymentFrequency.SameAsRegularPayment,
      prepaymentStartAt: 301,
    };

    service.computeMortgage(paymentPlan, prepaymentPlan).subscribe(res => {
      // Make sure that the test fails if success callback is called
      expect(true).toBeFalsy();
    }, (error) => {
      expect(error).toEqual('Start with payment must be less than or equal to the maximum number of payments (300)');
    });
  }));

  it('should throw error because prepayment is larger than mortgage amount', waitForAsync(() => {
    const paymentPlan: PaymentPlan = {
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: {
        years: 25,
        months: 0,
      },
      paymentFrequency: PaymentFrequency.Monthly,
      term: 5,
    };

    const prepaymentPlan: PrepaymentPlan = {
      prepaymentAmount: 100001,
      prepaymentFrequency: PrepaymentFrequency.SameAsRegularPayment,
      prepaymentStartAt: 1,
    };

    service.computeMortgage(paymentPlan, prepaymentPlan).subscribe(res => {
      // Make sure that the test fails if success callback is called
      expect(true).toBeFalsy();
    }, (error) => {
      expect(error).toEqual('The prepayment amount must be less than the mortgage amount');
    });
  }));
});
