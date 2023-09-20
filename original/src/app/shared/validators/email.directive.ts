import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { emailValidator } from './email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
    }
  ]
})
export class EmailDirective implements Validator, OnChanges {

  @Input() appEmail: string[] = []

  validator: ValidatorFn = () => null;

  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentEmailChanges = changes['appEmail'];
    if(currentEmailChanges) {
      this.validator = emailValidator(currentEmailChanges.currentValue);
    }
  }
}
