import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanFormComponent } from './payment-plan-form.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PaymentPlanFormComponent', () => {
  let component: PaymentPlanFormComponent;
  let fixture: ComponentFixture<PaymentPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanFormComponent ],
      imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
