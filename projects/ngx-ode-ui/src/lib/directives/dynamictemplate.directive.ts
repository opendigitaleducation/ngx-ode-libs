import {Compiler, Component, Directive, ElementRef, Input, NgModule, Injector, Type, ViewContainerRef} from '@angular/core';

import {CommonModule} from '@angular/common';
import {DynamicModuleImportsService} from '../services/dynamicModuleImports.service';

@Directive({
    selector: 'dynamic-template'
})
export class DynamicTemplateDirective {

    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef,
        private compiler: Compiler,
        private dynamicModuleImports: DynamicModuleImportsService
    ) {}

    @Input('template')
    set templateContents(html: string) {
        if (html) {
            this._html = html;
            const cmpType = this._createDynamicComponent();
            const moduleType = this._createDynamicModule(cmpType);
            const injector: Injector = Injector.create({
                providers: [],
                parent: this.viewContainer.parentInjector,
            });

            this.compiler.compileModuleAndAllComponentsAsync<any>(moduleType)
                .then(factory => {
                    let cmpFactory: any;
                    for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
                        if (factory.componentFactories[i].selector === this._selector) {
                            cmpFactory = factory.componentFactories[i];
                            break;
                        }
                    }
                    return cmpFactory;
                })
                .then(cmpFactory => {
                    if (cmpFactory && this.viewContainer) {
                        this.viewContainer.clear();
                        this.viewContainer.createComponent(cmpFactory, 0, injector);
                    }
                });
        } else {
            this._html = '';
            this.viewContainer.clear();
        }
    }

    private _html = '';
    private _selector = 'dynamic-view';

    @Input() private context: Object;

    private _createDynamicComponent(): Type<any> {
        const metadata = {
            selector: this._selector,
            template: this._html,
            inputs: ['template']
        };
        class _cmp_ {}
        _cmp_.prototype = this.context;
        return Component(metadata)(_cmp_);
    }

    private _createDynamicModule(componentType: Type<any>) {
        class _mod_ {}
        return NgModule({
            imports: [
                CommonModule,
                ...this.dynamicModuleImports.imports ],
            declarations: [componentType],
            providers: []
        })(_mod_);
    }

}
