import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PaymentFrequency} from '../../models/payment-frequency.enum';
import {Option} from '../../../app-common/model/option';
import {FormComponent} from '../../../app-common/form.component';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrls: ['./payment-plan-form.component.scss']
})
export class PaymentPlanFormComponent extends FormComponent implements OnInit, OnDestroy {

  public form = this.formBuilder.group({
    mortgageAmount: [
      100000,
      [
        Validators.min(0),
        Validators.required,
      ],
    ],
    interestRate: [
      5,
      [
        Validators.min(0),
        Validators.required,
      ],
    ],
    amortizationPeriod: this.formBuilder.group({
      years: [
        25,
        [
          Validators.min(1),
          Validators.max(30),
          Validators.required,
        ],
      ],
      months: [
        0,
        [
          Validators.min(0),
          Validators.max(11),
          Validators.required,
        ],
      ],
    }),
    paymentFrequency: [
      PaymentFrequency.Monthly,
      [
        Validators.required,
      ],
    ],
    term: [
      5,
      [
        Validators.required,
      ],
    ],
  });

  public paymentFrequencyOptions: Option[] = [
    {
      label: `Monthly`,
      value: PaymentFrequency.Monthly,
    },
    {
      label: `Semi Monthly`,
      value: PaymentFrequency.SemiMonthly,
    },
    {
      label: `Bi-Weekly`,
      value: PaymentFrequency.BiWeekly,
    },
    {
      label: `Accelerated Bi-Weekly`,
      value: PaymentFrequency.AcceleratedBiWeekly,
    },
    {
      label: `Weekly`,
      value: PaymentFrequency.Weekly,
    },
    {
      label: `Accelerated Weekly`,
      value: PaymentFrequency.AcceleratedWeekly,
    },
  ];

  private readonly maxTermLength = 10;

  public termOptions: Option[] = [...Array(this.maxTermLength).keys()].map((length => {
    const years = length + 1;

    const yearLabel = years === 1 ? 'Year' : 'Years';

    return {
      label: `${years} ${yearLabel}`,
      value: length + 1,
    };
  }));

  constructor(protected formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
