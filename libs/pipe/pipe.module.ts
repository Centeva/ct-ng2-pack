import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { Dictionary } from './dictionary.pipe';
import { IsEmpty } from './isEmpty.pipe';
import { Search } from './search.pipe';

@NgModule({
	declarations: [
		Dictionary,
		IsEmpty,
		Search,
	],
	exports: [
		Dictionary,
		IsEmpty,
		Search,
	],
	imports: [
		BrowserModule
	]
})
export class PipesModule {}
