import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SearchModel {
  matchArray: string[] = [''];
  matchObject: any = '';

  constructor(matchArray: string[], matchObject: any = ''){
    this.matchArray = matchArray;
    this.matchObject = matchObject;
  }
}

@Pipe({
  name: 'search',
  pure: false
})
export class Search implements PipeTransform {

    transform(value: any, args: any): any {
        if(args.matchObject === (null || "")){ return value; }
        let returnVal = _.filter(value, x => {
          let gets:any;
          gets = _.map(args.matchArray, m => _.get(x, m as string));
          for(let get of gets){
            let result;
            if(typeof(args.matchObject) === 'string'){
              result = get.toString().toLowerCase().includes(args.matchObject.toLowerCase());
            } else if (args.matchObject instanceof Array) {
				result = _.some(args.matchObject, x => x === get);
			 } else {
              result = get === args.matchObject;
            }
            if( result === true) return result;
          };
          return false;
        });
        return returnVal;
    }

}
