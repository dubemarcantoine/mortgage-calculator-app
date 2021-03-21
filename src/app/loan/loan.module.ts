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
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MortgagePaymentTableComponent } from './mortgage-calculator/mortgage-payment-table/mortgage-payment-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MortgageSummaryTableComponent } from './mortgage-calculator/mortgage-summary-table/mortgage-summary-table.component';


@NgModule({
  declarations: [MortgageCalculatorComponent, MortgageHomeComponent, PaymentPlanFormComponent, PrepaymentPlanFormComponent, MortgagePaymentTableComponent, MortgageSummaryTableComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    AppCommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class LoanModule {
}
