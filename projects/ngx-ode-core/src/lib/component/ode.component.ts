import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, OnDestroy, AfterViewInit, OnChanges, AfterContentInit, Injector,
  Component, Type, ChangeDetectorRef, InjectionToken, SimpleChanges } from '@angular/core';
import { Logger } from '../utils/Logger';

export const COMPONENT_LIFECYCLE_DEBUG_MODE = new InjectionToken<number>('debugComponentLifecycle');

@Component({
    template: ''
})
export class OdeComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, AfterContentInit {
    private logger: Logger;
    route: ActivatedRoute;
    router: Router;
    protected changeDetector: ChangeDetectorRef;
    protected subscriptions: Subscription = new Subscription();
    private debugComponentLifeCycle: number;

    constructor(public injector: Injector ) {
        this.debugComponentLifeCycle = injector.get(COMPONENT_LIFECYCLE_DEBUG_MODE);
        this.logger = injector.get<Logger>(Logger as Type<Logger>);
        this.route = injector.get<ActivatedRoute>(ActivatedRoute as Type<ActivatedRoute>);
        this.router = injector.get<Router>(Router as Type<Router>);
        this.changeDetector = injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
    }

    ngOnInit(): void {
        if (this.debugComponentLifeCycle) {
            this.info('ngOnInit');
        }
    }

    ngOnDestroy(): void {
        if (this.debugComponentLifeCycle) {
            this.info('ngOnDestroy');
        }
        this.subscriptions.unsubscribe();
    }

    ngAfterViewInit(): void {
        if (this.debugComponentLifeCycle) {
            this.info('ngAfterViewInit');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterContentInit(): void {
        if (this.debugComponentLifeCycle) {
            this.info('ngAfterContentInit');
        }
    }

    debug(message: string, object?: any): void {
        this.logger.debug(message, this, object);
    }

    info(message: string, object?: any): void {
        this.logger.info(message, this, object);
    }

    warn(message: string, object?: any): void {
        this.logger.warn(message, this, object);
    }

    error(message: string, object?: any): void {
        this.logger.error(message, this, object);
    }
}
