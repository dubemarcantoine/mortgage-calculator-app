import {async, ComponentFixture, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {PaymentPlanFormComponent} from './payment-plan-form/payment-plan-form.component';
import {PrepaymentPlanFormComponent} from './prepayment-plan-form/prepayment-plan-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {PaymentPlan} from '../models/payment-plan';
import {PrepaymentPlan} from '../models/prepayment-plan';
import {Observable, of} from 'rxjs';
import {Mortgage} from '../models/mortgage';
import {MortgageCalculatorService} from '../mortgage-calculator.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MortgagePaymentTableComponent} from './mortgage-payment-table/mortgage-payment-table.component';
import {MortgageSummaryTableComponent} from './mortgage-summary-table/mortgage-summary-table.component';

export class MortgageCalculatorServiceMock {
  public computeMortgage(paymentPlan: PaymentPlan, prepaymentPlan: PrepaymentPlan): Observable<Mortgage> {
    return of();
  }
}

describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MortgageCalculatorComponent,
        PaymentPlanFormComponent,
        PrepaymentPlanFormComponent,
        MortgagePaymentTableComponent,
        MortgageSummaryTableComponent,
      ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      providers: [
        {provide: MortgageCalculatorService, useClass: MortgageCalculatorServiceMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit button should be unclickable when disabled', waitForAsync(() => {
    const submitButton = fixture.debugElement.nativeElement.querySelector('.submit-button');

    component.canSubmit = false;

    fixture.detectChanges();

    spyOn(component, 'submit');

    fixture.whenStable().then(() => {
      submitButton.click();
      expect(component.submit).toHaveBeenCalledTimes(0);
    });
  }));

  it('submit button should be clickabled when enabled', waitForAsync(() => {
    const submitButton = fixture.debugElement.nativeElement.querySelector('.submit-button');

    component.canSubmit = true;

    fixture.detectChanges();

    spyOn(component, 'submit');

    fixture.whenStable().then(() => {
      submitButton.click();
      expect(component.submit).toHaveBeenCalledTimes(1);
    });
  }));
});
