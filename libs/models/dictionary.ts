export interface IDictionary<T> {
	add(key: keyType, value: T): void;
	remove(key: keyType): void;
	containsKey(key: keyType): boolean;
	foreach(callback: (value: T) => void): void;
	keys(): keyType[];
	values(): T[];
}

type keyType = string | number | any;

class Properties<T> {
	_keys: keyType[] = [];
	_values: T[] = [];
	_position: number = 0;
}

interface TypeConstructor extends Function {
	(value: any) : any;
}

type init<T> = { [k: string]: T } | { [k: number]: T };

export class Dictionary<T> {

	private _properties = new Properties<T>();

	private MapConstructor(value, ctor) {
		if (Array.isArray(value)) {
			return value.map(x => new ctor(x));
		}
		return ctor(value);
	}

	constructor(init: init<T> = {}, ctor?: TypeConstructor) {
		for (let key in init) {
			if (init.hasOwnProperty(key)) {
				this[key] = ctor ? this.MapConstructor(init[key], ctor) : init[key];
				this._properties._keys.push(key);
				this._properties._values.push(init[key]);
			}
		}
	}

	add(key: keyType, value: any): this {
		this[key] = value;
		this._properties._keys.push(key);
		this._properties._values.push(value);
		return this;
	}

	remove(key: keyType): this {
		let index = this._properties._keys.indexOf(key, 0);
		this._properties._keys.splice(index, 1);
		this._properties._values.splice(index, 1);

		delete this[key];
		return this;
	}

	keys(): keyType[] {
		return this._properties._keys;
	}

	values(): T[] {
		return this._properties._values;
	}

	foreach(callback: (value: T, key: keyType) => void): this {
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.containsKey(key)) {
				callback(this[key], key);
			}
		}
		return this;
	}

	map(callback: (key: keyType, value: T) => T): this {
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.containsKey(key)) {
				this[key] = callback(key, this[key]);
			}
		}
		return this;
	}

	aggregate(callback: (previousValue: T | null, currentValue: T, currentKey: keyType, dictionary: Dictionary<T>) => T, initialValue?: T): T | null {
		let previousValue = initialValue || null;
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.containsKey(key)) {
				previousValue = callback(previousValue, this[key], key, this);
			}
		}
		return previousValue;
	}

	containsKey(key: keyType) {
		if (typeof this[key] === 'undefined' || key === '_properties') {
			return false;
		}
		return true;
	}

	getKey(value: T) {
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.containsKey(key)) {
				if (this[key] === value) { return key; }
			}
		}
		return null;
	}

	thisType(): T | undefined {
		return;
	}

	toLookup(): IDictionary<T> {
		return this;
	}
}
