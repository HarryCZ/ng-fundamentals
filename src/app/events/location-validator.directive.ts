import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[valiadateLocation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})
export class LocationValidator implements Validator {
  validate(control: FormGroup): { [key: string]: any } {
    const addressControl = control.controls['address'];
    const cityControl = control.controls['city'];
    const countryControl = control.controls['country'];
    const onlineUrlControl = (<FormGroup>control.root).controls['onlineUrl'];

    if ((addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.value)
      || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return {validateLocation: false};
    }

  }
}
