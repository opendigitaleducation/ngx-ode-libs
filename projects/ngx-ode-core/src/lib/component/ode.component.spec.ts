import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OdeComponent, COMPONENT_LIFECYCLE_DEBUG_MODE } from './ode.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('NgxOdeCoreComponent', () => {
  let component: OdeComponent;
  let fixture: ComponentFixture<OdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ OdeComponent ],
      providers: [
        {provide: COMPONENT_LIFECYCLE_DEBUG_MODE, useValue: 1}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
