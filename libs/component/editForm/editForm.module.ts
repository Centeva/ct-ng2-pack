import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { SearchOptionsModule } from '../searchOptions/';
import { CheckListModule } from '../checkList';
import { EditFormComponent } from './editForm.component';

@NgModule({
	declarations: [
		EditFormComponent
	],
	exports: [
		EditFormComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		MdCheckboxModule,
		CheckListModule,
		SearchOptionsModule
	]
})
export class EditformModule {}
