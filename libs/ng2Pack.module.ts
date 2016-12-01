import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchOptionsModule } from './component/searchOptions';
import { EditformModule } from './component/editForm';
import { EditListModule } from './component/editList';
import { CheckListModule } from './component/checkList';
import { PipesModule } from './pipe/pipe.module';

@NgModule({
	exports: [
		SearchOptionsModule,
		EditformModule,
		EditListModule,
		CheckListModule,
		PipesModule
	],
	imports: [
		BrowserModule,
		FormsModule
	]
})
export class Ng2PackModule {}
