import { RequireService } from './require.interface'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

/**
 * Fetches a bundle from a target url.
 *
 * @export
 */
@Injectable()
export class HttpRequireService implements RequireService {

    constructor(private httpClient: HttpClient){}

    load(url) : Promise<Object> {
        return this.httpClient.get(url).toPromise()
            .then(data => data);
    }

}
