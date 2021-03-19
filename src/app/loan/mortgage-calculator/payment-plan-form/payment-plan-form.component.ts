import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentFrequency} from '../../models/payment-frequency.enum';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrls: ['./payment-plan-form.component.scss']
})
export class PaymentPlanFormComponent implements OnInit {

  public PaymentFrequency = PaymentFrequency;

  public paymentForm = this.formBuilder.group({
    amount: [100000],
    interestRate: [5],
    amortizationPeriod: this.formBuilder.group({
      years: [25],
      months: [0],
    }),
    paymentFrequency: [''],
    term: [5],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
