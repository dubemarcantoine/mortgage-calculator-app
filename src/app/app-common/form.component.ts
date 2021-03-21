import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  template: '',
})
export abstract class FormComponent implements OnInit, OnDestroy {
  public form: FormGroup = this.formBuilder.group({});

  public formValueChangesSubscription!: Subscription;

  public formStatusChangesSubscription!: Subscription;

  @Output()
  public valueChangeEvent = new EventEmitter<any>();

  @Output()
  public statusChangeEvent = new EventEmitter<boolean>();

  protected constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.valueChangeEvent.emit(this.form.getRawValue());
    this.statusChangeEvent.emit(this.form.status === 'VALID');

    this.formValueChangesSubscription = this.form.valueChanges.subscribe(() => {
      this.valueChangeEvent.emit(this.form.getRawValue());
    });

    this.formStatusChangesSubscription = this.form.statusChanges.subscribe(() => {
      this.statusChangeEvent.emit(this.form.status === 'VALID');
    });
  }

  ngOnDestroy(): void {
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }

    if (this.formStatusChangesSubscription) {
      this.formStatusChangesSubscription.unsubscribe();
    }
  }

}
