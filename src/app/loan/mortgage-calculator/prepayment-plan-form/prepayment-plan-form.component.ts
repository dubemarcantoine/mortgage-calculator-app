import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Option} from '../../../app-common/model/option';
import {PrepaymentFrequency} from '../../models/prepayment-frequency.enum';
import {FormComponent} from '../../../app-common/form.component';

@Component({
  selector: 'app-prepayment-plan-form',
  templateUrl: './prepayment-plan-form.component.html',
  styleUrls: ['./prepayment-plan-form.component.scss']
})
export class PrepaymentPlanFormComponent extends FormComponent implements OnInit, OnDestroy {

  public form = this.formBuilder.group({
    prepaymentAmount: [
      0,
      [
        Validators.required,
        Validators.min(0),
      ]
    ],
    prepaymentFrequency: [
      PrepaymentFrequency.OneTime,
      [
        Validators.required,
      ]
    ],
    prepaymentStartAt: [
      1,
      [
        Validators.required,
        Validators.min(1),
      ]
    ],
  });

  public prepaymentFrequencyOptions: Option[] = [
    {
      label: 'One Time',
      value: PrepaymentFrequency.OneTime,
    },
    {
      label: 'Yearly',
      value: PrepaymentFrequency.Yearly,
    },
    {
      label: 'Same As Regular Payment',
      value: PrepaymentFrequency.SameAsRegularPayment,
    },
  ];

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
