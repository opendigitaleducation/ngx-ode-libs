import { OdeComponent } from '../OdeComponent';
import { Component, EventEmitter, Input, OnInit, ViewChild, Injector } from '@angular/core';
import {icons, MessageBoxComponent, MessageType} from '../message-box/message-box.component';
import { DynamicComponentDirective } from '../../directives/dynamic-component/dynamic-component.directive';
import { ComponentDescriptor } from '../../directives/dynamic-component/component-descriptor.model';

@Component({
    selector: 'ode-message-sticker',
    templateUrl: './message-sticker.component.html',
    styleUrls: ['./message-sticker.component.scss']
})
export class MessageStickerComponent extends OdeComponent implements OnInit {
    @Input() type: MessageType;
    @Input() header: string;
    @Input() messages: (string | [string, {}])[];
    @ViewChild(DynamicComponentDirective, { static: false }) dComponent: DynamicComponentDirective;

    readonly icons = icons;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.type === undefined) {
            throw new Error('MessageSticker : type\' property must be set');
        }
    }

    newMessageBox(): ComponentDescriptor {
        return new ComponentDescriptor(MessageBoxComponent, {
            type: this.type,
            header: this.header,
            messages: this.messages,
            position: 'absolute',
            hideEvent: new EventEmitter<void>()
        });
    }

    loadMessageBox(): void {
        this.dComponent.load();
    }
}
