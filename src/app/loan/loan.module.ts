import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MortgageCalculatorComponent} from './mortgage-calculator/mortgage-calculator.component';
import {MortgageHomeComponent} from './mortgage-home/mortgage-home.component';
import {LoanRoutingModule} from './loan-routing.module';
import {AppCommonModule} from '../app-common/app-common.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaymentPlanFormComponent} from './mortgage-calculator/payment-plan-form/payment-plan-form.component';
import {PrepaymentPlanFormComponent} from './mortgage-calculator/prepayment-plan-form/prepayment-plan-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MortgageCalculatorComponent, MortgageHomeComponent, PaymentPlanFormComponent, PrepaymentPlanFormComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    AppCommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class LoanModule {
}
