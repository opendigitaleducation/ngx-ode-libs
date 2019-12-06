import {UploadFilesComponent} from './upload-files.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Directive, Input} from '@angular/core';
import {NgxOdeSijilModule} from 'ngx-ode-sijil';
import {InputFileService} from '../../services/inputFile.service';
import { COMPONENT_LIFECYCLE_DEBUG_MODE } from 'ngx-ode-core';
import { RouterTestingModule } from '@angular/router/testing';

describe('UploadFilesComponent', () => {
    let component: UploadFilesComponent;
    let fixture: ComponentFixture<UploadFilesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadFilesComponent, MockDragAndDropFilesDirective],
            providers: [
              InputFileService,
              {provide: COMPONENT_LIFECYCLE_DEBUG_MODE, useValue: 1}
            ],
            imports: [NgxOdeSijilModule.forRoot(), RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(UploadFilesComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create a UploadFilesComponent', () => {
        expect(component).toBeDefined();
    });
});

@Directive({
    selector: '[dragAndDropFiles]'
})
export class MockDragAndDropFilesDirective {
    @Input()
    allowedExtensions: Array<string> = [];
    @Input()
    maxFilesNumber = 1;
    @Input()
    disabled = false;
}
