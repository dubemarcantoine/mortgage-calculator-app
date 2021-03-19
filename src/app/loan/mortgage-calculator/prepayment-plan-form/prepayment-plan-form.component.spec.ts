import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentPlanFormComponent } from './prepayment-plan-form.component';

describe('PrepaymentPlanFormComponent', () => {
  let component: PrepaymentPlanFormComponent;
  let fixture: ComponentFixture<PrepaymentPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaymentPlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaymentPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
