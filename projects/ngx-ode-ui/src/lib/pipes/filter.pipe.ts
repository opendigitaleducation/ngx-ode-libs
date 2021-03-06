import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filter', pure: false})
export class FilterPipe implements PipeTransform {

    private stringFullCompare(str1: string, str2: string): boolean {
        return str1.match(new RegExp(str2, 'i')) !== null;
    }

    private _filterString(value, filter, arrayRef: Array<String>) {
        if (typeof value === 'string' &&
                typeof filter === 'string' &&
                filter.trim() &&
                this.stringFullCompare(value, filter)) {
            arrayRef.push(value);
            return true;
        }
        return false;
    }

    private _filterObject(object, filter, objectRef, arrayRef: Array<Object>) {
        if (typeof object == 'object' && typeof filter === 'object') {
            let check = true;
            for (const property in filter) {
                if (!check) {
                    break;
                }

                const filterValue = filter[property];
                const propsToCheck = property.split(",");

                const objectValues = new Array(propsToCheck.length);
                for(let i = propsToCheck.length; i-- > 0;)
                    objectValues[i] = object[propsToCheck[i].trim()];

                if (filterValue instanceof Function) {
                    check = filterValue.apply(null, objectValues);
                } else if (filterValue instanceof Object) {
                    if(propsToCheck.length > 1)
                        throw "Multi-argument object filtering is not yet supported";
                    return this._filterObject(objectValues[0], filterValue, objectRef, arrayRef);
                }
                else
                {
                    for(let i = objectValues.length; i-- > 0;)
                    {
                        if(!check)
                            break;

                        const objectValue = objectValues[i];

                        if (typeof objectValue === 'undefined' && typeof filterValue === 'string' && filterValue.length > 0 ) {
                            check = false;
                        } else if (objectValue instanceof Array && typeof filterValue === 'string') {
                            check = this.stringFullCompare(objectValue.join(), filterValue);
                        } else if (typeof filterValue === 'string' && typeof objectValue === 'string') {
                            check = this.stringFullCompare(objectValue, filterValue);
                        } else if (filterValue instanceof Array && typeof objectValue === 'string') {
                            for (let i = 0; i < filterValue.length; i++) {
                                check = this.stringFullCompare(objectValue, filterValue[i]);
                                if (check) { break; }
                            }
                        }
                    }
                }
            }
            if (check) {
                arrayRef.push(objectRef);
            }
            return true;
        }
         return false;
    }

    private _filterFunction(value, filter, arrayRef: Array<any>) {
            if (typeof filter === 'function') {
                if (filter(value)) {
                    arrayRef.push(value);
                }
                return true;
            }
            return false;
    }

    transform(array: Array<string | Object>, by: (string | Object | Function)) {
        if (!array || !by) {
            return array;
        }

        const filteredArray = [];

        array.forEach(item => {
            this._filterString(item, by, filteredArray) ||
                this._filterObject(item, by, item, filteredArray) ||
                    this._filterFunction(item, by, filteredArray);
        });

        return filteredArray;
    }

}
