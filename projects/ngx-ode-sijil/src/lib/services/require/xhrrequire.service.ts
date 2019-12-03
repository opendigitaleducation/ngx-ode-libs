import { RequireService } from './require.interface'

export class XHRRequire implements RequireService {
    
    load(from: string, async?: boolean) : Promise<Object>{
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest()

            request.open('GET', from, !async)
            request.responseType = "json"
            request.onload = function(e) {
                if(request.status === 200){
                    let json = request.response
                    resolve(json)
                } else {
                    console.log('Unsupported language.')
                }
            }
            request.onerror = function(e) {
                console.error(e)
            }
            request.send()
        })
    }

}