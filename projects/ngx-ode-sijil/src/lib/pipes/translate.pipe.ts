import { BundlesService } from '../services/bundles.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'translate', pure: false})
export class TranslatePipe implements PipeTransform {

    constructor(private bundlesService: BundlesService) {}

    transform(key: string, parameters?: object | any[], lang?: string): string {
        return this.bundlesService.translate(key, parameters, lang);
    }

}
