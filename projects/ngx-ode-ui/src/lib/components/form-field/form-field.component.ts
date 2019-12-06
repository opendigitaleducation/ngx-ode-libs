import { Component, Input, Injector } from '@angular/core';
import { OdeComponent } from 'ngx-ode-core';

@Component({
  selector: 'ode-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent extends OdeComponent {
  @Input() label: string;
  @Input() help: string;

  constructor(injector: Injector) {
    super(injector);
  }
}
