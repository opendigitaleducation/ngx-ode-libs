import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InputFileService } from './services/inputFile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxOdeSijilModule } from 'ngx-ode-sijil';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ItemTreeComponent } from './components/item-tree/item-tree.component';
import { LightBoxComponent } from './components/lightbox/lightbox.component';
import { LightboxConfirmComponent } from './components/lightbox-confirm/lightbox-confirm.component';
import { ListComponent } from './components/list/list.component';
import { MonoSelectComponent } from './components/mono-select/mono-select.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MultiComboComponent } from './components/multi-combo/multi-combo.component';
import { PanelSectionComponent } from './components/panel-section/panel-section.component';
import { PortalComponent } from './components/portal/portal.component';
import { PushPanelComponent } from './components/push-panel/push-panel.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SideLayoutComponent } from './components/side-layout/side-layout.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { StepComponent, WizardComponent } from './components/wizard/wizard.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { SimpleSelectComponent } from './components/value-editable/simple-select.component';
import { MessageStickerComponent } from './components/message-sticker/message-sticker.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AnchorDirective } from './directives/anchor.directive';
import { DynamicTemplateDirective } from './directives/dynamictemplate.directive';
import { DynamicComponentDirective } from './directives/dynamic-component/dynamic-component.directive';
import { DragAndDropFilesDirective } from './directives/drag-and-drop-files.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { FlattenObjectArrayPipe } from './pipes/flattenObjArray.pipe';
import { LimitPipe } from './pipes/limit.pipe';
import { OrderPipe } from './pipes/orderBy.pipe';
import { StorePipe } from './pipes/store.pipe';
import { LocalizedDatePipe } from './pipes/localizedDate.pipe';
import { BytesPipe } from './pipes/bytes.pipe';
import { DynamicModuleImportsService } from './services/dynamicModuleImports.service';
import { LabelsService } from './services/labels.service';
import { SpinnerCubeComponent } from './components/spinner-cube/spinner-cube.component';
import { PagerComponent } from './components/table/pager.component';
import { EllipsisComponent } from './components/ellipsis/ellipsis.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ObjectURLDirective } from './directives/object-url.directive';
import { LengthPipe } from './pipes/length.pipe';

@NgModule({
  declarations: [
    // components
    DatepickerComponent,
    FormErrorsComponent,
    FormFieldComponent,
    ItemTreeComponent,
    LightBoxComponent,
    LightboxConfirmComponent,
    ListComponent,
    MonoSelectComponent,
    MultiSelectComponent,
    MultiComboComponent,
    PanelSectionComponent,
    PortalComponent,
    PushPanelComponent,
    SearchInputComponent,
    SideLayoutComponent,
    SidePanelComponent,
    StepComponent,
    TooltipComponent,
    WizardComponent,
    SimpleSelectComponent,
    MessageStickerComponent,
    MessageBoxComponent,
    UploadFilesComponent,
    SpinnerCubeComponent,
    PagerComponent,
    EllipsisComponent,
    // directives
    AnchorDirective,
    DynamicTemplateDirective,
    DynamicComponentDirective,
    DragAndDropFilesDirective,
    ObjectURLDirective,
    // pipes
    FilterPipe,
    FlattenObjectArrayPipe,
    LimitPipe,
    OrderPipe,
    StorePipe,
    LocalizedDatePipe,
    BytesPipe,
    KeysPipe,
    LengthPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxOdeSijilModule.forChild(),
    InfiniteScrollModule
  ],
  exports: [
    // components
    DatepickerComponent,
    FormErrorsComponent,
    FormFieldComponent,
    ItemTreeComponent,
    LightBoxComponent,
    LightboxConfirmComponent,
    ListComponent,
    MonoSelectComponent,
    MultiSelectComponent,
    MultiComboComponent,
    PanelSectionComponent,
    PortalComponent,
    PushPanelComponent,
    SearchInputComponent,
    SideLayoutComponent,
    SidePanelComponent,
    StepComponent,
    TooltipComponent,
    WizardComponent,
    SimpleSelectComponent,
    MessageStickerComponent,
    MessageBoxComponent,
    UploadFilesComponent,
    SpinnerCubeComponent,
    PagerComponent,
    EllipsisComponent,
    // directives
    AnchorDirective,
    DynamicTemplateDirective,
    DynamicComponentDirective,
    DragAndDropFilesDirective,
    ObjectURLDirective,
    // pipes
    FilterPipe,
    FlattenObjectArrayPipe,
    LimitPipe,
    OrderPipe,
    StorePipe,
    LocalizedDatePipe,
    BytesPipe,
    KeysPipe,
    LengthPipe
  ],
  providers: [InputFileService, OrderPipe],
  entryComponents: [SimpleSelectComponent, MessageBoxComponent]
})
export class NgxOdeUiModule {
  static forRoot(labelsProvider: Provider): ModuleWithProviders {
    return {
      ngModule: NgxOdeUiModule,
      providers: [
          DynamicModuleImportsService,
          labelsProvider || LabelsService
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
        ngModule: NgxOdeUiModule,
        providers: []
    }
  }
}
