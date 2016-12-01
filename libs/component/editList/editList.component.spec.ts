/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter, QueryList, Query } from '@angular/core';
import { Store, AppState, Action, DataActions, MiscActions, dataReducer, miscReducer } from '../../../cdux';
import { async, inject } from '@angular/core/testing';
import { Tools } from '../editForm/';
import { EditItemType, EditItemRow } from '../editItem/';
import { EditFormComponent } from '../editForm';
import { ScheduleItemProcedureSample } from '../../../models/generated';
import { CodeType } from '../../../models';

import { EditListComponent } from './editList.component';

describe('Component: editList', () => {
	let store: Store;
	let state: AppState = new AppState();
	let dataActions: DataActions;
	let miscActions: MiscActions;
	let c: EditListComponent;

	beforeEach(() => {
		store = new Store(state, dataReducer, miscReducer);
		dataActions = jasmine.createSpyObj('dataActions', ['getCodeTables']);
		miscActions = jasmine.createSpyObj('miscActions', ['poke']);

		c = new EditListComponent(store, dataActions, miscActions);
	});

	it('should create an instance', () => {
		expect(c).toBeTruthy();
	});

	it('should init', () => {
		c.ngOnInit();
		expect(miscActions.poke).toHaveBeenCalled();
	});

	it('should update on changes', () => {
		c.calcHeaders = jasmine.createSpy('headers');
		c.ngOnChanges({});

		expect(c.calcHeaders).toHaveBeenCalled();
		expect(dataActions.getCodeTables).toHaveBeenCalled();

	});

	it('should get Options codetables', () => {
		c.forms = [new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		)];

		c.onStoreChange(state);
		expect(dataActions.getCodeTables).toHaveBeenCalledWith('bestCodeTable');

		state.lastAction = <Action>{type: DataActions.prototype.getCodeTables, payload: []};
		state.codeTables['bestCodeTable'] = <CodeType[]>[{Name: 'One', Code: '1'}, {Name: 'Two', Code: '2'}];
		c.onStoreChange(state);
		expect(c.forms[0].Fields.some(f => f.Params.OptionsArray.some(x => x.Name === 'One')));
	});

	it('should get Options store property', () => {
		state.samples = [new ScheduleItemProcedureSample({Description: 'TestSample-1', Id: 1200})];

		c.forms = [new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('samples', undefined, x => _.map(<{ Description: string, Id: number }[]>x, s => <Tools.NameValuePair>{ Name: s.Description, Value: s.Id }),)
			)
		)];

		c.onStoreChange(state);
		expect(c.forms[0].Fields.some(f => f.Params.OptionsArray.some(x => x.Name === 'TestSample-1'))).toBeTruthy();

	});

	it('should get the names for each display field', () => {
		c.forms = [new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, true,
				new Tools.FieldParams('bestCodeTable')
			),
			new Tools.Field(20, 'InitField-1', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			),
			new Tools.Field(30, 'InitField-2', Tools.FieldType.Options, undefined, undefined, undefined, true,
				new Tools.FieldParams('bestCodeTable')
			)
		),
		new Tools.Form(9002, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, true,
				new Tools.FieldParams('bestCodeTable')
			)
		)];

		let result = c.calcHeaders();
		expect(result.some(f => f === 'InitField-0')).toBeTruthy();
		expect(result.some(f => f === 'InitField-1')).toBeFalsy();
		expect(result.some(f => f === 'InitField-2')).toBeTruthy();
	});

	it('should add an item', () => {
		let onAdd = jasmine.createSpyObj('onAdd', ['emit']);
		c.onAdd = onAdd;
		c.editing[0] = false;
		c.editing[1] = true;
		c.addItem();

		expect(onAdd.emit).toHaveBeenCalled();
		expect(c.editing[0]).toBeTruthy();
		expect(c.editing[1]).toBeFalsy();
	});

	it('should return false if we already have added a field', () => {
		c.forms = [new Tools.Form(9001, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		)];

		expect(c.disableAdd()).toBeFalsy();

		c.forms = [new Tools.Form(0, () => {}, () => {}, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		)];

		expect(c.disableAdd()).toBeTruthy();
	});

	it('should edit a form and cancel new ones if we have them', () => {
		let cancelOne = jasmine.createSpy('cancel');
		let cancelTwo = jasmine.createSpy('cancel');

		c.forms = [new Tools.Form(0, () => {}, cancelOne, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		),
		new Tools.Form(10, () => {}, cancelTwo, undefined, undefined, undefined,
			new Tools.Field(10, 'InitField-0', Tools.FieldType.Options, undefined, undefined, undefined, undefined,
				new Tools.FieldParams('bestCodeTable')
			)
		)];

		c.edit(c.forms.find(f => f.Id !== 0));
		expect(cancelOne).toHaveBeenCalled();
		expect(cancelTwo).not.toHaveBeenCalled();
		expect(c.editing[10]).toBeTruthy();
	});

	it('should calculate the header width', () => {
		c.headers = ['One', 'Two', 'Three'];
		let result = c.calcHeaderWidth();
		expect(result).toEqual(`${100 / 3}%`);
	});

	it('should calculate the field width', () => {
		c.headers = ['One', 'Two', 'Three'];
		let result = c.calcFieldWidth();
		expect(result).toEqual(`${100 / 3}%`);
	});

	it('should clear editing', () => {
		c.editing[0] = true;
		c.cancelItem();
		expect(c.editing).toEqual({});
	});

	it('should clear editing', () => {
		c.editing[0] = true;
		c.saveItem();
		expect(c.editing).toEqual({});
	});

	it('should get value', () => {
		let testField = new Tools.Field(0, 'Test', Tools.FieldType.Options, 0, undefined, undefined, undefined,
			new Tools.FieldParams(undefined, [<Tools.NameValuePair>{Name: 'OptionName', Value: 0}])
		)
		expect(c.getValue(testField)).toEqual('OptionName');
		testField.Type = Tools.FieldType.Text;
		expect(c.getValue(testField)).toEqual(0);
	});

	it('should force save or cancel', () => {
		let TestComponentOne = new EditFormComponent(store, dataActions);
		let TestComponentTwo = new EditFormComponent(store, dataActions);
		TestComponentOne.forceSave = jasmine.createSpy('forceSave');
		TestComponentTwo.forceSave = jasmine.createSpy('forceSave');
		TestComponentOne.newForm = new Tools.Form(0, () => {}, () => {});
		TestComponentTwo.newForm = new Tools.Form(1, () => {}, () => {});
		TestComponentOne.form = new Tools.Form(0, () => {}, () => {});
		TestComponentTwo.form = new Tools.Form(1, () => {}, () => {});
		let editFormComponents = { _results: [TestComponentOne, TestComponentTwo] };
		c.editForms = editFormComponents;
		c.editing = { 0: true, 1: false }
		c.forceSave();

		expect(TestComponentOne.forceSave).toHaveBeenCalled();
		expect(TestComponentTwo.forceSave).not.toHaveBeenCalled();

	});
});
