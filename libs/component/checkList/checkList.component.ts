import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tools } from '../editForm';
import * as _ from 'lodash';

@Component({
	selector: 'check-list',
	templateUrl: 'checkList.component.html',
	styleUrls: ['checkList.component.less']
})
export class CheckListComponent {
	@Input() options: Tools.NameValuePair[] = [];
	@Input() values: any[] = [];
	@Output() onChecked: EventEmitter<any> = new EventEmitter<any>();
	@Input() required: boolean = false;
	storeSubscription: Subscription;

	constructor() { }

	onChanged(value: any){
		this.onChecked.emit(value);
	}

	isChecked(id: string | number) {
		return _.findIndex(this.values, c => +c === id) >= 0;
	}

	getSelected() {
		return this.values ? this.values.length + " Selected" : "0 Selected";
	}

	isInvalid(){
		return this.required && this.values.length === 0 && this.options.length > 0;
	}
}
