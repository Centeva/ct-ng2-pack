import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary as DictionaryClass } from '../models/dictionary';
import * as _ from 'lodash';

@Pipe({
  name: 'dictionary'
})
export class Dictionary implements PipeTransform {

  transform(value: any, args?: any[]): any {
    return Object.keys(value).map (k => ({key: k, value: value[k]})).filter(x => value.containsKey(x.key));
  }

}
