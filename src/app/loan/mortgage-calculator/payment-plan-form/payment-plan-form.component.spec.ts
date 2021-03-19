import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanFormComponent } from './payment-plan-form.component';

describe('PaymentPlanFormComponent', () => {
  let component: PaymentPlanFormComponent;
  let fixture: ComponentFixture<PaymentPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPlanFormComponent ]
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
