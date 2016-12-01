/* tslint:disable:no-unused-variable */

import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';
import { Store, AppState, Action, DataActions, MiscActions, dataReducer, miscReducer } from '../../../cdux';
import { async, inject } from '@angular/core/testing';
import { Tools } from '../editForm/';
import { EditItemType, EditItemRow } from '../editItem/';
import { EditFormComponent } from './editForm.component';

import { ScheduleItemProcedureSample } from '../../../models/generated';
import { CodeType } from '../../../models';

describe('Component: editForm', () => {
	let store: Store;
	let state: AppState = new AppState();
	let dataActions: DataActions;
	let c: EditFormComponent;

	beforeEach(() => {
		store = new Store(state, dataReducer, miscReducer);
		dataActions = jasmine.createSpyObj('dataActions', ['getCodeTables']);

		c = new EditFormComponent(store, dataActions);
	});

	it('should create an instance', () => {
		expect(c).toBeTruthy();
	});

	it('should get Options codetables', () => {
		c.newForm = new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		);

		c.onStoreChange(state);
		expect(dataActions.getCodeTables).toHaveBeenCalledWith('bestCodeTable');

		state.lastAction = <Action>{type: DataActions.prototype.getCodeTables, payload: []};
		state.codeTables['bestCodeTable'] = <CodeType[]>[{Name: 'One', Code: '1'}, {Name: 'Two', Code: '2'}];
		c.onStoreChange(state);
		expect(c.newForm.Fields.some(f => f.Params.OptionsArray.some(x => x.Name === 'One')));
	});

	it('should get Options store property', () => {
		state.samples = [new ScheduleItemProcedureSample({Description: 'TestSample-1', Id: 1200})];

		c.newForm = new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('samples', undefined, x => _.map(<{ Description: string, Id: number }[]>x, s => <Tools.NameValuePair>{ Name: s.Description, Value: s.Id }), )
			)
		);

		c.onStoreChange(state);
		expect(c.newForm.Fields.some(f => f.Params.OptionsArray.some(x => x.Name === 'TestSample-1'))).toBeTruthy();

	});

	it('should call changed if the field has it.', () => {
		let changedSpy = jasmine.createSpy('changed');
		c.newForm = new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('samples', undefined, undefined, undefined, changedSpy)
			)
		);

		c.callChanged(100, c.newForm.Fields[0]);
		expect(changedSpy).toHaveBeenCalled();
	});

	it('should save', () => {
		let saveFormSpy = jasmine.createSpy('saveForm');
		let saveSpy = jasmine.createSpy('saved');
		let onSaveSpy = jasmine.createSpyObj('onSave', ['emit']);

		c.newForm = new Tools.Form(9001, saveFormSpy, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams(undefined, undefined, undefined, undefined, undefined, saveSpy)
			),
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined)
		);
		c.onSave = onSaveSpy;

		c.save();

		expect(saveFormSpy).toHaveBeenCalled();
		expect(saveSpy).toHaveBeenCalled();
		expect(onSaveSpy.emit).toHaveBeenCalled();

	});

	it('should cancel', () => {
		let cancelFormSpy = jasmine.createSpy('cancelForm');
		let onCancelSpy = jasmine.createSpyObj('onCancel', ['emit']);

		c.form = new Tools.Form(9001, () => {}, cancelFormSpy, undefined, undefined, undefined,
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined)
		);
		c.newForm = new Tools.Form(9001, () => {}, cancelFormSpy, undefined, undefined, undefined,
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined)
		);
		c.onCancel = onCancelSpy;

		c.cancel();

		expect(cancelFormSpy).toHaveBeenCalled();
		expect(onCancelSpy.emit).toHaveBeenCalled();

	});

	it('should call util', () => {
		let utilSpy = jasmine.createSpy('Util');
		c.newForm = new Tools.Form(9001, () => {}, () => {}, utilSpy, undefined, undefined,
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined)
		);

		c.util();
		expect(utilSpy).toHaveBeenCalledWith(c.newForm);

	});

	it('should check if form is invalid', () => {
		let utilSpy = jasmine.createSpy('Util');
		c.newForm = new Tools.Form(9001, () => {}, () => {}, utilSpy, undefined, undefined,
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, undefined, undefined, true, undefined)
		);

		let result = c.isFormInvalid();
		expect(result).toBeTruthy();

		c.newForm = new Tools.Form(9001, () => {}, () => {}, utilSpy, undefined, undefined,
			new Tools.Field(20, 'InitField-0', Tools.FieldType.Options, 100, undefined, true, undefined)
		);

		result = c.isFormInvalid();
		expect(result).toBeFalsy();
	});

	it('should check if field is invalid', () => {
		let testField = new Tools.Field(0, 'TestField-1', Tools.FieldType.Static, null, undefined, true);
		expect(c.isFieldInvalid(testField)).toBeTruthy();
		testField.Required = false;
		expect(c.isFieldInvalid(testField)).toBeFalsy();
	});

	// What is this even doing?
	it('should format value for checklist', () => {
		let testField = new Tools.Field(1, 'InitField-0', Tools.FieldType.Checklist, undefined);
		c.optionChecked(testField, 1);
		expect(testField.Value[0]).toEqual('1');
		expect(testField.Value.length).toEqual(1);
		c.optionChecked(testField, '2');
		expect(testField.Value[1]).toEqual('2');
		expect(testField.Value.length).toEqual(2);
		c.optionChecked(testField, '1');
		c.optionChecked(testField, '2');
		expect(testField.Value.length).toEqual(0);
	});

	it('should try to save, or will cancel', () => {
		let val = false;
		c.isFormInvalid = (() => val).bind(this);
		c.save = jasmine.createSpy('save');
		c.cancel = jasmine.createSpy('cancel');

		c.forceSave();
		expect(c.save).toHaveBeenCalled();

		val = true;
		c.forceSave();
		expect(c.cancel).toHaveBeenCalled();
	});



});
