import {Injectable} from '@angular/core';
import {PaymentPlan} from './models/payment-plan';
import {PrepaymentPlan} from './models/prepayment-plan';
import {Observable, of, throwError} from 'rxjs';
import {PrepaymentFrequency} from './models/prepayment-frequency.enum';
import {PaymentFrequency} from './models/payment-frequency.enum';
import {YearMonth} from './models/year-month';
import {MortgagePayment} from './models/mortgage-payment';
import {Mortgage} from './models/mortgage';

@Injectable({
  providedIn: 'root'
})
export class MortgageCalculatorService {

  public readonly defaultPrepaymentPlan: PrepaymentPlan = {
    prepaymentAmount: 0,
    prepaymentFrequency: PrepaymentFrequency.OneTime,
    prepaymentStartAt: 1,
  };

  constructor() {
  }

  public computeMortgage(paymentPlan: PaymentPlan, prepaymentPlan: PrepaymentPlan = this.defaultPrepaymentPlan): Observable<Mortgage> {
    const amortizationPeriodMonths = this.getAmortizationPeriodMonths(paymentPlan.amortizationPeriod);
    const termMonths = this.yearsToMonths(paymentPlan.term);

    if (termMonths > amortizationPeriodMonths) {
      return throwError('The amortization period must be equal to or greater than the term');
    }

    if (prepaymentPlan.prepaymentStartAt > amortizationPeriodMonths) {
      return throwError(`Start with payment must be less than or equal to the maximum number of payments (${amortizationPeriodMonths})`);
    }

    if (prepaymentPlan.prepaymentAmount > paymentPlan.mortgageAmount) {
      return throwError(`The prepayment amount must be less than the mortgage amount`);
    }

    const interestRatePercentage = paymentPlan.interestRate / 100;
    const yearlyPaymentCount = this.getYearlyPayments(paymentPlan.paymentFrequency);
    const paymentPeriodInterestRate = interestRatePercentage / yearlyPaymentCount;
    const paymentMonthlyInterest = interestRatePercentage / 12;
    const paymentsCountAmortization = this.getNumberOfPaymentsPerMonth(paymentPlan.paymentFrequency) * amortizationPeriodMonths;

    let paymentAmount;
    switch (paymentPlan.paymentFrequency) {
      case PaymentFrequency.Monthly:
      case PaymentFrequency.SemiMonthly:
      case PaymentFrequency.BiWeekly:
      case PaymentFrequency.Weekly:
        paymentAmount = this.getPeriodPaymentsValue(paymentPlan.mortgageAmount, paymentPeriodInterestRate, paymentsCountAmortization);
        break;
      case PaymentFrequency.AcceleratedBiWeekly:
        paymentAmount = this.getAcceleratedBiWeeklyPaymentsValue(
          paymentPlan.mortgageAmount,
          paymentMonthlyInterest,
          amortizationPeriodMonths
        );
        break;
      case PaymentFrequency.AcceleratedWeekly:
        paymentAmount = this.getAcceleratedWeeklyPaymentsValue(
          paymentPlan.mortgageAmount,
          paymentMonthlyInterest,
          amortizationPeriodMonths
        );
        break;
    }

    const mortgagePayments = this.getMortgagePayments(paymentPlan, prepaymentPlan, paymentPeriodInterestRate, paymentAmount);

    const termPaymentCount = yearlyPaymentCount * paymentPlan.term;
    const mortgage: Mortgage = {
      term: {
        numberOfPayments: mortgagePayments.length < termPaymentCount ? mortgagePayments.length : termPaymentCount,
        paymentAmount,
        prepaymentAmount: prepaymentPlan.prepaymentAmount,
        principalPaymentsTotal: 0,
        interestPaymentsTotal: 0,
        total: 0,
      },
      amortized: {
        numberOfPayments: mortgagePayments.length,
        paymentAmount,
        prepaymentAmount: prepaymentPlan.prepaymentAmount,
        principalPaymentsTotal: 0,
        interestPaymentsTotal: 0,
        total: 0,
      },
      mortgagePayments,
    };

    mortgagePayments.forEach((payment, i) => {
      if (i < termPaymentCount) {
        mortgage.term.interestPaymentsTotal = this.getAmountValue(mortgage.term.interestPaymentsTotal + payment.interest);
        mortgage.term.principalPaymentsTotal = this.getAmountValue(mortgage.term.principalPaymentsTotal + payment.principal);
        mortgage.term.total = this.getAmountValue(mortgage.term.total + payment.total);
      }

      mortgage.amortized.interestPaymentsTotal = this.getAmountValue(mortgage.amortized.interestPaymentsTotal + payment.interest);
      mortgage.amortized.principalPaymentsTotal = this.getAmountValue(mortgage.amortized.principalPaymentsTotal + payment.principal);
      mortgage.amortized.total = this.getAmountValue(mortgage.amortized.total + payment.total);
    });

    return of(mortgage);
  }

  public getMortgagePayments(
    paymentPlan: PaymentPlan,
    prepaymentPlan: PrepaymentPlan,
    paymentPeriodInterestRate: number,
    paymentAmount: number
  ): MortgagePayment[] {
    const mortgagePayments: MortgagePayment[] = [];

    let principal = paymentPlan.mortgageAmount;

    while (principal >= 0) {
      const paymentInterest = this.getPaymentInterest(principal, paymentPeriodInterestRate);

      const mortgagePayment: MortgagePayment = {
        total: 0,
        interest: this.getPaymentInterest(principal, paymentPeriodInterestRate),
        principal: this.getPaymentPrincipal(
          paymentAmount,
          paymentInterest,
          paymentPlan.paymentFrequency,
          prepaymentPlan,
          mortgagePayments.length + 1
        ),
      };

      mortgagePayment.total = this.getAmountValue(mortgagePayment.principal + mortgagePayment.interest);

      mortgagePayments.push(mortgagePayment);

      principal = this.getAmountValue(principal - mortgagePayment.principal);
    }

    let asdf = 0;
    mortgagePayments.forEach(p => {
      asdf = this.getAmountValue(asdf + p.principal);
    });
    console.log(asdf);

    return mortgagePayments;
  }

  public shouldApplyPrepayment(paymentFrequency: PaymentFrequency, prepaymentPlan: PrepaymentPlan, paymentNumber: number): boolean {
    switch (prepaymentPlan.prepaymentFrequency) {
      case PrepaymentFrequency.OneTime:
        return paymentNumber === prepaymentPlan.prepaymentStartAt;
      case PrepaymentFrequency.Yearly:
        return paymentNumber >= prepaymentPlan.prepaymentStartAt
          && paymentNumber % this.getYearlyPayments(paymentFrequency)
          === (prepaymentPlan.prepaymentStartAt % this.getYearlyPayments(paymentFrequency));
      case PrepaymentFrequency.SameAsRegularPayment:
        return paymentNumber >= prepaymentPlan.prepaymentStartAt;
    }
  }

  public getAmountValue(amount: number): number {
    return Math.round(amount * 100) / 100;
  }

  public getPaymentInterest(principal: number, interestRate: number): number {
    return this.getAmountValue(principal * interestRate);
  }

  public getPaymentPrincipal(
    totalPaymentAmount: number,
    interestAmount: number,
    paymentFrequency: PaymentFrequency,
    prepaymentPlan: PrepaymentPlan,
    paymentNumber: number
  ): number {
    let amount = this.getAmountValue(totalPaymentAmount - interestAmount);

    if (this.shouldApplyPrepayment(paymentFrequency, prepaymentPlan, paymentNumber)) {
      amount = this.getAmountValue(amount + prepaymentPlan.prepaymentAmount);
    }

    return amount;
  }

  public getAcceleratedWeeklyPaymentsValue(principal: number, periodInterest: number, monthlyPayments: number): number {
    return this.getPeriodPaymentsValue(principal, periodInterest, monthlyPayments, 4);
  }

  public getAcceleratedBiWeeklyPaymentsValue(principal: number, periodInterest: number, monthlyPayments: number): number {
    return this.getPeriodPaymentsValue(principal, periodInterest, monthlyPayments, 2);
  }

  public getPeriodPaymentsValue(principal: number, periodInterest: number, numberOfPayments: number, weeks: number = 1): number {
    return this.getAmountValue((principal * (
      (periodInterest * Math.pow(1 + periodInterest, numberOfPayments))
      / (Math.pow(1 + periodInterest, numberOfPayments) - 1)
    )) / weeks);
  }

  public getYearlyPayments(paymentFrequency: PaymentFrequency): number {
    switch (paymentFrequency) {
      case PaymentFrequency.Monthly:
        return 12;
      case PaymentFrequency.SemiMonthly:
        return 24;
      case PaymentFrequency.BiWeekly:
      case PaymentFrequency.AcceleratedBiWeekly:
        return 26;
      case PaymentFrequency.Weekly:
      case PaymentFrequency.AcceleratedWeekly:
        return 52;
    }
  }

  public getNumberOfPaymentsPerMonth(paymentFrequency: PaymentFrequency): number {
    return this.getYearlyPayments(paymentFrequency) / 12;
  }

  public getAmortizationPeriodMonths(yearMonth: YearMonth): number {
    return this.yearsToMonths(yearMonth.years) + yearMonth.months;
  }

  private yearsToMonths(years: number): number {
    return years * 12;
  }
}
