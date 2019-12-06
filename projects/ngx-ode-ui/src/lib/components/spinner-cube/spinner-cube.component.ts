import { OdeComponent } from 'ngx-ode-core';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Injector } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'ode-spinner-cube',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './spinner-cube.component.html',
    styleUrls: ['./spinner-cube.component.scss']
})
export class SpinnerCubeComponent extends OdeComponent implements OnInit {

    @Input('waitingFor')
    set loadingProp(prop: string) {
        this._loadingProp = prop;
    }
    get loadingProp() { return this._loadingProp; }
    private _loadingProp: string;


    constructor(
        injector: Injector,
        public spinner: SpinnerService) {
            super(injector);
        }

    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.spinner.trigger.subscribe(() => {
            this.changeDetector.markForCheck();
        }));
    }

}
