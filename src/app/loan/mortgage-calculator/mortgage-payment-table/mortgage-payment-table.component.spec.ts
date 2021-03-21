import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagePaymentTableComponent } from './mortgage-payment-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

describe('MortgagePaymentTableComponent', () => {
  let component: MortgagePaymentTableComponent;
  let fixture: ComponentFixture<MortgagePaymentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgagePaymentTableComponent ],
      imports: [
        MatTableModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgagePaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
