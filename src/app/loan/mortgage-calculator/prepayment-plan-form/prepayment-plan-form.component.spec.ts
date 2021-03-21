import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentPlanFormComponent } from './prepayment-plan-form.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PrepaymentPlanFormComponent', () => {
  let component: PrepaymentPlanFormComponent;
  let fixture: ComponentFixture<PrepaymentPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaymentPlanFormComponent ],
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
    fixture = TestBed.createComponent(PrepaymentPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
