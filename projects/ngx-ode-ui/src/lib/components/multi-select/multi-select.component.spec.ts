import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MultiSelectComponent, SelectOption} from './multi-select.component';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgxOdeSijilModule} from 'ngx-ode-sijil';
import { COMPONENT_LIFECYCLE_DEBUG_MODE } from 'ngx-ode-core';
import { RouterTestingModule } from '@angular/router/testing';

describe('MultiSelectComponent', () => {
    let component: MultiSelectComponent<any>;
    let form: MockFormComponent<any>;
    let fixture: ComponentFixture<MockFormComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MultiSelectComponent,
                MockFormComponent
            ],
            imports: [
                NgxOdeSijilModule.forRoot(),
                FormsModule,
                RouterTestingModule
            ],
            providers: [
              {provide: COMPONENT_LIFECYCLE_DEBUG_MODE, useValue: 1}
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(MockFormComponent);
        form = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(MultiSelectComponent)).componentInstance;
    }));

    it('should create a MultiSelectComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should display the given options', () => {
        component.options = [{label: '1', value: 1}, {label: '2', value: 2}];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.lct-multi-select__options-item').length).toBe(2);
    });

    it('should be initially closed', () => {
        expect(component.isOptionsVisible).toBeFalsy();
        expect(getToggle(fixture).classes['multi-select__toggle--active']).toBeFalsy();
        expect(getOptionsContainer(fixture).classes['multi-select__options-container--active']).toBeFalsy();
    });

    it('should be opened when user click on the toggle', () => {
        clickOn(getToggle(fixture));
        fixture.detectChanges();
        expect(component.isOptionsVisible).toBeTruthy();
        expect(getToggle(fixture).classes['multi-select__toggle--active']).toBeTruthy();
        expect(getOptionsContainer(fixture).classes['multi-select__options-container--active']).toBeTruthy();
    });

    describe('with primitive values', () => {
        beforeEach(async(() => {
            form.options = [{label: '1', value: 1}, {label: '2', value: 2}];
            form.trackByFn = (option) => option;
            fixture.detectChanges();
        }));

        describe('with empty model', () => {
            it(`should change the model to [2] when clicking on the option with label '2'`, () => {
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option2);
                expect(isOptionSelected(option2)).toBeFalsy();
                expect(form.model).toEqual([2]);
            });

            it(`should change the model to [1, 2] when clicking on the option with label '1' then '2'`, () => {
                const option1 = getOptionByIndex(fixture, 0);
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option1);
                clickOn(option2);
                fixture.detectChanges();
                expect(isOptionSelected(option1)).toBeTruthy();
                expect(isOptionSelected(option2)).toBeTruthy();
                expect(form.model).toEqual([1, 2]);
            });
        });

        describe('with initial model', () => {
            beforeEach(async(() => {
                form.model = [2];
                fixture.detectChanges();
            }));

            it(`should change the model to [] when clicking on the option with label '2' and model was [2]`, () => {
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option2);
                expect(isOptionSelected(option2)).toBeFalsy();
                expect(form.model).toEqual([]);
            });
        });
    });

    describe('with structured values', () => {
        beforeEach(async(() => {
            form.options = [{label: '1', value: {name: 'test1'}}, {label: '2', value: {name: 'test2'}}, {
                label: '3',
                value: {name: 'test3'}
            }];
            form.trackByFn = (option) => option.name;
            fixture.detectChanges();
        }));

        describe('with empty model', () => {
            it(`should change the model to [test2] when clicking on the option with label '2'`, () => {
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option2);
                fixture.detectChanges();
                expect(isOptionSelected(option2)).toBeTruthy();
                expect(form.model).toEqual([{name: 'test2'}]);
            });

            it(`should change the model to [1, 2] when clicking on the option with label '1' then '2'`, () => {
                const option1 = getOptionByIndex(fixture, 0);
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option1);
                clickOn(option2);
                fixture.detectChanges();
                expect(isOptionSelected(option1)).toBeTruthy();
                expect(isOptionSelected(option2)).toBeTruthy();
                expect(form.model).toEqual([{name: 'test1'}, {name: 'test2'}]);
            });
        });

        describe('with initial model [test2]', () => {
            beforeEach(async(() => {
                form.model = [{name: 'test2'}];
                fixture.detectChanges();
            }));

            it(`should change the model to [] when clicking on the option with label '2'`, () => {
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option2);
                expect(isOptionSelected(option2)).toBeFalsy();
                expect(form.model).toEqual([]);
            });
        });

        describe('with initial model [test2, test3]', () => {
            beforeEach(async(() => {
                form.model = [{name: 'test2'}, {name: 'test3'}];
                fixture.detectChanges();
            }));

            it(`should change the model to [test3] when clicking on the option with label '2'`, () => {
                const option2 = getOptionByIndex(fixture, 1);
                clickOn(option2);
                expect(isOptionSelected(option2)).toBeFalsy();
                expect(form.model).toEqual([{name: 'test3'}]);
            });


            describe('without preview', () => {
                beforeEach(async(() => {
                    form.preview = false;
                    fixture.detectChanges();
                }));

                it(`should display 0 preview items`, () => {
                    expect(getAllPreviewItems(fixture).length).toBe(0);
                });
            });

            describe('with preview', () => {
                beforeEach(async(() => {
                    form.preview = true;
                    fixture.detectChanges();
                }));

                it(`should display 2 preview items`, () => {
                    expect(getAllPreviewItems(fixture).length).toBe(2);
                });

                it(`should change the model to [test3] when clicking on the preview item with label '2'`, () => {
                    clickOn(getPreviewItemByIndex(fixture, 0));
                    fixture.detectChanges();
                    expect(getAllPreviewItems(fixture).length).toBe(1);
                    expect(form.model).toEqual([{name: 'test3'}]);
                });
            });
        });
    });
});


function getToggle(fixture: ComponentFixture<MockFormComponent<any>>): DebugElement {
    return fixture.debugElement.query(By.css('.lct-multi-select__toggle'));
}

function getOptionsContainer(fixture: ComponentFixture<MockFormComponent<any>>): DebugElement {
    return fixture.debugElement.query(By.css('.lct-multi-select__options-container'));
}

function getOptionByIndex(fixture: ComponentFixture<MockFormComponent<any>>, index: number): DebugElement {
    return fixture.debugElement.queryAll(By.css('.lct-multi-select__options-item'))[index];
}


function getAllPreviewItems(fixture: ComponentFixture<MockFormComponent<any>>): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css('.lct-multi-select__options-preview-item'));
}

function getPreviewItemByIndex(fixture: ComponentFixture<MockFormComponent<any>>, index: number): DebugElement {
    return getAllPreviewItems(fixture)[index];
}

function isOptionSelected(option: DebugElement): boolean {
    return option.classes['multi-select__options-item--selected'];
}

function clickOn(el: DebugElement): void {
    return el.triggerEventHandler('click', null);
}

@Component({
    selector: `mock-form`,
    template: `
        <ode-multi-select [(ngModel)]="model"
                          [options]="options"
                          [trackByFn]="trackByFn"
                          [label]="label"
                          [preview]="preview">
        </ode-multi-select>`
})
class MockFormComponent<K> {
    model: any;
    options: Array<SelectOption<K>> = [];
    trackByFn;
    label: string;
    preview = false;
}
