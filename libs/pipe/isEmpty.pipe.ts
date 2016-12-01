import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
	name: 'isEmpty'
})
export class IsEmpty implements PipeTransform {

	transform(value: any, args?: boolean): boolean {
		return args ? !_.isEmpty(value) : _.isEmpty(value);
	}
}
