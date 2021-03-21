import {Component, OnInit} from '@angular/core';
import {PaymentPlan} from '../models/payment-plan';
import {PrepaymentPlan} from '../models/prepayment-plan';
import {MortgageCalculatorService} from '../mortgage-calculator.service';
import {take} from 'rxjs/operators';
import {Mortgage} from '../models/mortgage';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements OnInit {
  public canSubmit = true;

  public mortgage!: Mortgage;
  public errorMessage!: string | null;

  private paymentPlan!: PaymentPlan;
  private paymentPlanValid = true;
  private prepaymentPlan!: PrepaymentPlan;
  private prepaymentPlanValid = true;

  constructor(private mortgageCalculatorService: MortgageCalculatorService) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.errorMessage = null;

    if (this.canSubmit) {
      this.canSubmit = false;

      this.mortgageCalculatorService.computeMortgage(this.paymentPlan, this.prepaymentPlan)
        .pipe(take(1))
        .subscribe(result => {
          this.mortgage = result;
        }, error => {
          this.errorMessage = error;
        }, () => {
          this.setCanSubmit();
        });
    }
  }

  public onPaymentPlanValueChange(paymentPlan: PaymentPlan): void {
    this.paymentPlan = paymentPlan;
  }

  public onPaymentPlanStatusChange(isValid: boolean): void {
    this.paymentPlanValid = isValid;

    this.setCanSubmit();
  }

  public onPrepaymentPlanValueChange(prepaymentPlan: PrepaymentPlan): void {
    this.prepaymentPlan = prepaymentPlan;
  }

  public onPrepaymentPlanStatusChange(isValid: boolean): void {
    this.prepaymentPlanValid = isValid;

    this.setCanSubmit();
  }

  private setCanSubmit(): void {
    this.canSubmit = this.paymentPlanValid && this.prepaymentPlanValid;
  }
}
