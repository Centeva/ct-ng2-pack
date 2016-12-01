import * as _ from 'lodash';

export namespace Tools {
	// FieldType: The type of fields we can show. This acts like a string enum. It HAS to be one of the values shown.
	export enum FieldType {
		Header,
		Static,
		Text,
		Email,
		TextArea,
		Date,
		Options,
		Checklist,
		Checkbox,
		Button
	}

	// A type used for passing data into dropdowns.
	export interface NameValuePair { Name: string | number; Value: any; };

	export type mapFunc = (value: any) => NameValuePair[];

	export type WidthTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	// FormParams: Extra paramaters that can be passed into a form.
	export type FormParams = {
		Style?: string,
		Icon?: string
	};

	// FieldParams: Extra paramaters that can be passed into a field.
	export class FieldParams {
		// OptionsParams: Used for dropdowns, We can populate dropdowns multiple ways.
		// 1- string name of a codeTable. We will fetch the code table and fill the dropdown with the result.
		// 2- string name of a store object. We will grab that object from the store and use the *Map* param to turn it into an array of NameValuePairs.
		// The end result of each of these is to populate the OptionsArray, That is what we really care about.
		OptionsParams?: string;
		// OptionsArray: An array of NameValuePairs. This can be assigned manually, or automatically by passing a string into OptionsParams.
		OptionsArray?: NameValuePair[];
		// Map: Used to map a store object into a NameValuePair array.
		// 1- A function used to map a store object into a NameValuePair array.
		// 2- A NameValuePair of the name and value we want to map from.
		Map?: mapFunc | NameValuePair;
		// Style: String name of a css class to apply to the field. NOT IMPLEMENTED.
		Style?: string;
		// Changed: A callback function for when a dropdown changes or when a button is clicked. Needs to be added to other fieldTypes.
		Changed?: (form: Form, field: Field) => void;
		// Save: A funtion to save this field. Will be called before the forms save function. This is not the main way to save a form. Use the save function on a form.
		Save?: (field: Field) => void;

		// GroupBy: Sometimes we don't want to show a field unless another field has a certain condition.
		// We also want to sometimes do And/Or operations to groups.
		// You can pass in an array of NameValuePair arrays to do this.
		// Vertical is "And" and Horizontal is "Or".
		// And: [[{Name: 1, Value: 0}, {Name: 2, Value: 1}]]. This means that this field will only show if another field with id of 1's value is 0 AND another field with id of 2's value is 1.
		// Or: [[{Name: 1, Value: 0}], [{Name: 2, Value: 1}]]. This means that this field will only shof if another field with id of 1's value is 0 OR another field with id of 2's value is 1.
		// The difference is the nesting of the arrays.
		// These can also be mixed and matched. [[{Name: 1, Value: 0}, {Name: 2, Value: 0}], [{Name: 1, Value: 2}]].
		GroupBy?: [NameValuePair[]];

		// Flag if you want options selected by default.
		// We use this for Checklist to select all items when you start.
		OptionsStartSelected?: boolean;

		// css name of Icons to apply to the displayed field.
		Icon?: string;

		// Specify if you want to override the column width.
		Width?: WidthTypes;

		constructor(OptionsParams?: string, OptionsArray?: NameValuePair[], Map?: mapFunc | NameValuePair, Style?: string, Changed?: (form: Form, field: Field) => void, Save?: (field: Field) => void, GroupBy?: [NameValuePair[]], OptionsStartSelected = false, Icon?: string, Width?: WidthTypes) {
			this.OptionsParams = OptionsParams;
			this.OptionsArray = OptionsArray;
			this.Map = Map;
			this.Style = Style;
			this.Changed = Changed;
			this.Save = Save;
			this.GroupBy = GroupBy;
			this.OptionsStartSelected = OptionsStartSelected;
			this.Icon = Icon;
			this.Width = Width;
		}
	};

	export class Field {
		Id: number;
		// Name: The label that will be displayed. Used for header names.
		Name: string;
		// Type: What type of field is this? TextArea, Options, etc.
		Type: FieldType;
		// HelpText: Optional help text that can be displayed.
		HelpText: string;
		// Required: Is this field required to save?
		Required: Boolean;
		// Display: Will this field be displayed when were not editing it? I.e. Will it have a header?
		Display: Boolean;
		// FieldParams: Additional params that can be passed to a field.
		Params: FieldParams;
		// Value: The actual value of the field.
		Value: any;
		// OptionsId: An optional param that can be used as a placeholder. We needed it in findings to store an Id.
		OptionsId?: number;
		//Do we want to hide this element in our form? Useful if you want to show it in the header only
		HideInForm?: boolean;

		constructor(Id: number, Name: string, Type: FieldType, Value: any = undefined, HelpText = '', Required = false, Display = false, Params: FieldParams = undefined, OptionsId: number = undefined, HideInForm = false) {
			this.Id = Id;
			this.Name = Name;
			this.Type = Type;
			this.HelpText = HelpText;
			this.Required = Required;
			this.Display = Display;
			this.Params = Params;
			this.Value = Value;
			this.OptionsId = OptionsId;
			this.HideInForm = HideInForm;
		}
	};

	// Form: The main object for the editForm. We will pass one of these to an editForm, Or an array of them into editList.
	export class Form {
		Id: number;
		// Fields: An array of fields that the form will have. What inputs does this form need?
		Fields: Field[];
		// Params: Extra paramaters. NEED IMPLEMENTATION.
		Params: FormParams;
		// Save: A function used to save the form. *make sure to ().bind(this) if you use 'this' in your function!
		Save: (form: Form) => void;
		// Cancel: A function used to cancel a form. *make sure to ().bind(this) if you use 'this' in your function!
		Cancel: (form: Form) => void;
		// Util: A function called when the utility button at the bottom of the form is clicked. If no function is passed in the button will not be shown
		// *make sure to ().bind(this) if you use 'this' in your function!
		Util: (form: Form) => void;
		// Text displayed for the util button. If no text is supplied it will default to 'Delete'
		UtilText: string;

		constructor(Id: number, Save: (form: Form) => void, Cancel: (form: Form) => void, Util?: (form: Form) => void, UtilText = 'Delete', Params?: FormParams, ...fields: Field[]) {
			this.Id = Id;
			this.Save = Save;
			this.Cancel = Cancel;
			this.Util = Util;
			this.UtilText = UtilText;
			this.Params = Params;
			this.Fields = fields;
		}
	};

	export function checkGroup(field: Field, fields: Field[]): boolean {
		let result = true;
		if (field.Params && field.Params.GroupBy) {
			result = _.some(field.Params.GroupBy, gby => _.every(gby, g => _.some(fields, f => {
				if (g.Name === f.Id && this.checkGroup(f)) {
					if (g.Value !== null && g.Value !== undefined) {
						if (g.Value + '' === f.Value + '') {
							return true;
						}
					} else {
						return true;
					}
				}
				return false;
			})));
		}
		return result;
	};

	// {CodeTableName: 'CodeTableCode'}
	export type mapObj = { [key: string]: string };

	export function mapFormToModel<T>(form: Form, mapObj?: mapObj, ...ignore: string[]): T {
		let val = {};

		for (let field of form.Fields) {
			if (!ignore.some(i => i === field.Name)) {
				if (mapObj && mapObj.hasOwnProperty(field.Name)) {
					val = _.set(val, mapObj[field.Name], field.Value);
				} else {
					val = _.set(val, field.Name.replace(' ', ''), field.Value);
				}
			}
		}

		val['Id'] = form.Id;

		return val as T;
	};

}
