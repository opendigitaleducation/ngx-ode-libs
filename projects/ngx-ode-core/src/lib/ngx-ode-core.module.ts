import { NgModule } from '@angular/core';
import { OdeComponent, COMPONENT_LIFECYCLE_DEBUG_MODE } from './component/ode.component';

@NgModule({
  declarations: [OdeComponent],
  imports: [
  ],
  exports: [OdeComponent],
  providers: [
    { provide: COMPONENT_LIFECYCLE_DEBUG_MODE, useValue: 1 }
  ]
})
export class NgxOdeCoreModule { }
