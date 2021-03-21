import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageHomeComponent } from './mortgage-home.component';
import {AppCommonModule} from '../../app-common/app-common.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MortgageHomeComponent', () => {
  let component: MortgageHomeComponent;
  let fixture: ComponentFixture<MortgageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageHomeComponent ],
      imports: [
        AppCommonModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
