import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { S5lComponent } from './components/s5l.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RequireService } from './services/require/require.interface';
import { Parser } from './services/parser/parser.interface';
import { SijilOpts, defaultSijilOpts } from './services/sijil.opts';
import { BundlesService } from './services/bundles.service';
import { HttpRequireService } from './services/require/httprequire.service';
import { FragmentsParser } from './services/parser/fragments.parser';

@NgModule({
  declarations: [S5lComponent, TranslatePipe],
  imports: [HttpClientModule],
  exports: [S5lComponent, TranslatePipe]
})
export class NgxOdeSijilModule {
  static forRoot(require?: Type<RequireService>, parser?: Type<Parser>, options?: SijilOpts): ModuleWithProviders {
    return {
        ngModule: NgxOdeSijilModule,
        providers: [
            { provide: BundlesService, useClass: BundlesService, deps: [ RequireService, Parser, SijilOpts ] },
            { provide: RequireService, useClass: require || HttpRequireService },
            { provide: Parser, useClass: parser || FragmentsParser },
            { provide: SijilOpts, useValue: options || defaultSijilOpts }
        ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
        ngModule: NgxOdeSijilModule,
        providers: []
    };
  }
}
