import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageSummaryTableComponent } from './mortgage-summary-table.component';
import {MatTableModule} from '@angular/material/table';

describe('MortgageSummaryTableComponent', () => {
  let component: MortgageSummaryTableComponent;
  let fixture: ComponentFixture<MortgageSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageSummaryTableComponent ],
      imports: [
        MatTableModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
