import {Component, Input, OnInit} from '@angular/core';
import {Mortgage} from '../../models/mortgage';
import {MatTableDataSource} from '@angular/material/table';

interface MortgageSummaryRow {
  category: string;
  term: number;
  amortizedPeriod: number;
  format?: string;
}

@Component({
  selector: 'app-mortgage-summary-table',
  templateUrl: './mortgage-summary-table.component.html',
  styleUrls: ['./mortgage-summary-table.component.scss']
})
export class MortgageSummaryTableComponent implements OnInit {

  public dataSource: MatTableDataSource<MortgageSummaryRow> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'category',
    'term',
    'amortizedPeriod',
  ];

  constructor() {
  }

  @Input()
  set mortgage(m: Mortgage) {
    this.dataSource.data = [
      {
        category: 'Number of Payments',
        term: m.term.numberOfPayments,
        amortizedPeriod: m.amortized.numberOfPayments,
      },
      {
        category: 'Mortgage Payment',
        term: m.term.paymentAmount,
        amortizedPeriod: m.amortized.paymentAmount,
        format: 'currency',
      },
      {
        category: 'Prepayment',
        term: m.term.prepaymentAmountTotal,
        amortizedPeriod: m.amortized.prepaymentAmountTotal,
        format: 'currency',
      },
      {
        category: 'Interest Payments',
        term: m.term.interestPaymentsTotal,
        amortizedPeriod: m.amortized.interestPaymentsTotal,
        format: 'currency',
      },
      {
        category: 'Principal Payments',
        term: m.term.principalPaymentsTotal,
        amortizedPeriod: m.amortized.principalPaymentsTotal,
        format: 'currency',
      },
      {
        category: 'Total Cost',
        term: m.term.total,
        amortizedPeriod: m.amortized.total,
        format: 'currency',
      },
    ];
  }

  ngOnInit(): void {
  }

}
