import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MortgageCalculatorComponent} from './mortgage-calculator/mortgage-calculator.component';
import {MortgageHomeComponent} from './mortgage-home/mortgage-home.component';

const routes: Routes = [
  {
    path: '',
    component: MortgageHomeComponent,
  },
  {
    path: 'mortgage-calculator',
    component: MortgageCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
