import { OdeComponent } from 'ngx-ode-core';
import { Component, ElementRef, forwardRef, Input, Injector } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/* MultiSelectComponent is a rewrite of MultiComboComponent to integrate it easily in angular forms */

export interface SelectOption<K> {
    label: string;
    value: K;
}

@Component({
    selector: 'ode-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }],
    host: {
        '(document:click)': 'closeIfOpened($event)'
    }
})
export class MultiSelectComponent<K> extends OdeComponent implements ControlValueAccessor {
    @Input()
    public label = '';

    @Input()
    public options: Array<SelectOption<K>> = [];

    @Input()
    public preview = false;

    @Input()
    public trackByFn: (optionValue: K) => number | string;

    public model: Array<K> = [];

    public isDisabled = false;

    public isOptionsVisible = false;

    constructor(injector: Injector, private elementRef: ElementRef) {
        super(injector);
    }

    public optionClicked(option: SelectOption<K>) {
        if (this.model) {
            const index = this.getIndexOfOptionInModel(option);
            if (index < 0) {
                this.model.push(option.value);
            } else {
                this.model.splice(index, 1);
            }
        } else {
            this.model = [option.value];
        }
        this.onChange(this.model);
    }

    public deselectAll(): void {
        this.model = [];
        this.onChange(this.model);
    }

    public toggleOptionsVisibility(): void {
        this.isOptionsVisible = !this.isOptionsVisible;
    }

    public isSelected(option: SelectOption<K>): boolean {
        return this.model ? (this.getIndexOfOptionInModel(option) >= 0) : false;
    }

    public closeIfOpened(event: any) {
        if (this.isOptionsVisible
          && !this.elementRef.nativeElement.querySelector('.lct-multi-select__options-container').contains(event.target)
          && !this.elementRef.nativeElement.querySelector('.lct-multi-select__toggle').contains(event.target)) {
            this.isOptionsVisible = false;
        }
        return true;
    }

    private getIndexOfOptionInModel(option: SelectOption<K>): number {
        return this.model.map(this.trackByFn).indexOf(this.trackByFn(option.value));
    }

    private onChange = (_: Array<K>) => {
    }

    private onTouched = () => {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(obj: Array<K>): void {
        this.model = obj;
        this.onChange(this.model);
    }
}
