import { Component, Input, trigger, state, style, transition, animate, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tools } from './editForm.models';
import * as _ from 'lodash';

@Component({
	selector: 'edit-form',
	templateUrl: 'editForm.component.html',
	styleUrls: ['editForm.component.less'],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				opacity: '1'
			})),
			transition('void => *', [
				style({opacity: '0', height: '0', margin: '0', padding: '0'}),
				animate('400ms ease-in', style({opacity: '1', height: '*', margin: '*', padding: '*'}))
			]),
			transition('* => void', [
				animate('400ms ease-out', style({opacity: '0', height: '0', margin: '0', padding: '0'}))
			])
		]),
		trigger('slideInOutChild', [
			state('in', style({
				opacity: '1'
			})),
			transition('void => *', [
				style({position: 'relative'}),
				animate('400ms ease-in', style({position: 'absolute'}))
			]),
			transition('* => void', [
				animate('400ms ease-out', style({position: 'relative'}))
			])
		]),
		trigger('listSlideChild', [
			transition('void => *', [
				style({position: 'absolute', width: '100%', 'z-index': -5, opacity: '0', height: '0', margin: '0', padding: '0'}),
				animate('400ms ease-in', style({position: '*', opacity: '1', height: '*', margin: '*', padding: '*'}))
			]),
			transition('* => void', [
				animate('400ms ease-out', style({position: 'absolute', opacity: '0', height: '0', margin: '0', padding: '0'}))
			])
		])
	]
})
export class EditFormComponent implements OnInit {

	// form: What form object are we using?
	@Input() form: Tools.Form = null;
	// refreshFunction: We have special ways of giving options and checklists info, this function is used to do that. (Its broken out because depending on your stack you need it to do differnet things. ie. If you have cdux it should hook up to the store.)
	@Input() refreshFunction: Function;
	// onCancel: We needed to call a forms cancel button from inside editForm, but we also needed to toggle the editing object in editlist, we needed chose to pass an event up. This should not be used unless inside a 'middle-man' component like editList.
	@Output() onCancel: EventEmitter<Tools.Form> = new EventEmitter<Tools.Form>();
	// onSave: We need to toggle the editing object in editList when we save so we pass this up as well
	@Output() onSave: EventEmitter<Tools.Form> = new EventEmitter<Tools.Form>();
	// newForm: We bind to this form instead of 'form' so that if we cancel we revert c hanges.
	newForm: Tools.Form;
	helpText: { [x: string]: boolean } = {};
	fieldType = Tools.FieldType;
	checkGroup = Tools.checkGroup;
	storeSubscription: Subscription;

	state: EditFormComponent = this;

	constructor(/*private store: Store, private dataActions: DataActions*/) { }

	ngOnInit() {
		// Set newForm to form.
		this.newForm = _.cloneDeep(this.form);
	}

	ngOnChange() {
		this.refreshFunction().bind();
	}
	// Removed because of cdux.
	// refreshFormStuff(s: any) {
	// 	// We want to get data for Options fields. We loop through each field that is an Options.
	// 	this.newForm.Fields.filter(f => f.Type === Tools.FieldType.Options || f.Type === Tools.FieldType.Checklist).forEach(f => {
	// 		// We check to see if we have Params.OptionsParams.
	// 		if (f.Params &&	f.Params.OptionsParams) {
	// 			// We may have already looped through here and hit getCodeTables. If so we want to take those codeTables.
	// 			if (s.lastAction.type === DataActions.prototype.getCodeTables && s.codeTables[f.Params.OptionsParams]) {
	// 				// We map the codeTable into the OptionsArray.
	// 				f.Params.OptionsArray =  <Tools.NameValuePair[]>_.map(s.codeTables[f.Params.OptionsParams], (c: any) => ({Name: c.Name, Value: c.Code}));
	// 			} else {
	// 				// We can also pass a string name of a store property, and fill the field that way.
	// 				if (s.hasOwnProperty(f.Params.OptionsParams)) {
	// 					// Map can be a NameValuePair to use or a function, This is because we do not want to trust a function from the database.
	// 					if (f.Params.Map instanceof Function) {
	// 						// Return our map function.
	// 						f.Params.OptionsArray = f.Params.Map(s[f.Params.OptionsParams]);
	// 					} else {
	// 						// Map our property names to a NameValuePair.
	// 						f.Params.OptionsArray = _.map(s[f.Params.OptionsParams],
	// 							m => <Tools.NameValuePair>({Name: m[f.Params.Map['Name']], Value: m[f.Params.Map['Value']]})
	// 						);
	// 					}
	// 				} else if (f.Params.OptionsArray === undefined && s.lastAction.type !== DataActions.prototype.getCodeTables) {
	// 					// The store doesn't have anything with this name, it must be a codeTable. Call to get it.
	// 					this.dataActions.getCodeTables(f.Params.OptionsParams);
	// 				}
	// 			}
	// 			if(f.Params.OptionsArray && f.Params.OptionsStartSelected && f.Type === Tools.FieldType.Checklist && f.Value === undefined) {
	// 				f.Value = _.map(f.Params.OptionsArray, x => x.Value + '');
	// 			}
	// 		}
	// 	});
	// }

	// If this field has a 'changed' function, call it.
	callChanged(value: any, field: Tools.Field) {
		if (field.Params && field.Params.Changed) {
			let newField = _.cloneDeep(field);
			newField.Value = value;
			field.Params.Changed(this.newForm, newField);
		}
	}

	// Save the form.
	save() {
		// Set form to newForm.
		this.form = _.cloneDeep(this.newForm);
		// Call each fields optional save funtion.
		this.newForm.Fields.forEach(f => { if (f.Params && f.Params.Save) { f.Params.Save(f); } });
		// Call the forms save function.
		this.newForm.Save(this.newForm);
		// Pass up our onSave event.
		this.onSave.emit();
	}

	// cancel the form.
	cancel() {
		// Set newForm to form.
		this.newForm = _.cloneDeep(this.form);

		// Call the forms cancel function.
		this.newForm.Cancel(this.newForm);

		// Pass up our onCancel event.
		this.onCancel.emit(this.newForm);
	}

	// Call util function on the form.
	util() {
		// Call the forms util function.
		this.newForm.Util(this.newForm);
	}

	isFormInvalid() {
		return _.find(this.newForm.Fields, f => f.Type !== Tools.FieldType.Static && f.Required && (_.isNil(f.Value) || (Array.isArray(f.Value) && f.Value.length === 0))) !== undefined;
	}

	isFieldInvalid(field: Tools.Field) {
		return field.Required && _.isNil(field.Value);
	}

	// Format values of our checklist field
	optionChecked(field: Tools.Field, value: any) {
		value = value += '';
		if (field.Value !== null && _.findIndex(field.Value, x => x === value) >= 0) {
			field.Value = _.filter(field.Value, x => x !== value);
		} else {
			if (field.Value === null || field.Value === undefined) {
				field.Value = [value];
			}else {
				field.Value.push(value);
			}
		}
	}

	forceSave() {
		if (!this.isFormInvalid()) {
			this.save();
		}else {
			this.cancel();
		}
	}
}
