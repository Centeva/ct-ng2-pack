import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WherePipe } from 'angular-pipes/src/array/where.pipe';

export interface NameValuePair { Name: string; Value: any; };

@Component({
	moduleId: module.id,
	selector: 'search-options',
	templateUrl: 'searchOptions.component.html',
	styleUrls: ['searchOptions.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SearchOptionsComponent),
			multi: true
		}
	],
	host: {
		'(document:click)': 'clickOutOfComponent($event)',
	}
})
export class SearchOptionsComponent implements ControlValueAccessor {
	@Input() _optionsValue: any = null;
	@Input() options: NameValuePair[] = [];
	@Input() required: boolean = false;
	@Output() onChange: EventEmitter<any> = new EventEmitter<any>();
	search: string = undefined;
	toggled = false;

	propagateChange = (_: any) => { };

	constructor(private elementRef: ElementRef) { }

	get optionsValue() {
		return this._optionsValue;
	}

	set optionsValue(val) {
		this._optionsValue = val;
		this.propagateChange(this._optionsValue);
		let option = this.options ? this.options.find(x => x.Value+'' === val+'') : undefined;
		if(option && option.Name){this.search = option.Name}
	}

	set(val) {
		this.optionsValue = val;
		this.onChange.emit(val);
		this.toggled = false;
	}

	writeValue(value: any) {
		if (value !== undefined) {
			this.optionsValue = value;
		}
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched() { }

	searchMatch(item: NameValuePair) {
		return _.toLower(item.Name).includes(_.toLower(this.search));
	}

	clickOutOfComponent(event){
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.toggled = false;
			let option = this.options ? this.options.find(x => x.Value === this._optionsValue) : undefined;
			if(option && option.Name){this.search = option.Name} else{this.search = undefined}
		}
	}

	openDropdown(){
		this.toggled = true;
		this.search = undefined;
	}

	print() {
		console.log('Do this!');
	}

	isInvalid(){
		return this.required && !this._optionsValue;
	}

	eventHandler(keyCode){
		if(keyCode === 13){ this.openDropdown(); }
	}
}
