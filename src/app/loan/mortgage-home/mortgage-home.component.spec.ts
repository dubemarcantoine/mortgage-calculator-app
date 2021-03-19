import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageHomeComponent } from './mortgage-home.component';

describe('MortgageHomeComponent', () => {
  let component: MortgageHomeComponent;
  let fixture: ComponentFixture<MortgageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
