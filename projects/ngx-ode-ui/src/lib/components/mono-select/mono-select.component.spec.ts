import {MonoSelectComponent} from './mono-select.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxOdeSijilModule} from 'ngx-ode-sijil';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {SelectOption} from '../multi-select/multi-select.component';
import { COMPONENT_LIFECYCLE_DEBUG_MODE } from 'ngx-ode-core';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonoSelectComponent', () => {
    let component: MonoSelectComponent<any>;
    let form: MockFormComponent<any>;
    let fixture: ComponentFixture<MockFormComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MonoSelectComponent,
                MockFormComponent
            ],
            imports: [
                NgxOdeSijilModule.forRoot(),
                FormsModule,
                RouterTestingModule
            ],
            providers: [
              {provide: COMPONENT_LIFECYCLE_DEBUG_MODE, useValue: 1}
            ],

        }).compileComponents();
        fixture = TestBed.createComponent(MockFormComponent);
        form = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(MonoSelectComponent)).componentInstance;
    }));

    it('should create a MultiSelectComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the given options', () => {
        component.options = [{label: '1', value: 1}, {label: '2', value: 2}];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.lct-form-select__options').length).toBe(2);
    });
});

@Component({
    selector: `mock-form`,
    template: `
        <ode-mono-select [(ngModel)]="model"
                         [options]="options"></ode-mono-select>`
})
class MockFormComponent<K> {
    model: any;
    options: Array<SelectOption<K>> = [];
}
