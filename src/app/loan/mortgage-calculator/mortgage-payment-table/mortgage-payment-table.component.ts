import {Component, Input, OnInit} from '@angular/core';
import {MortgagePayment} from '../../models/mortgage-payment';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-mortgage-payment-table',
  templateUrl: './mortgage-payment-table.component.html',
  styleUrls: ['./mortgage-payment-table.component.scss']
})
export class MortgagePaymentTableComponent implements OnInit {

  public dataSource: MatTableDataSource<MortgagePayment> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'paymentNumber',
    'interest',
    'principal',
    'total',
  ];

  constructor() {
  }

  @Input()
  set payments(mortagePayments: MortgagePayment[]) {
    this.dataSource.data = mortagePayments;
  }

  ngOnInit(): void {
  }

}
