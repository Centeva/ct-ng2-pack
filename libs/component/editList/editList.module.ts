import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EditformModule } from '../editForm';
import { PipesModule } from '../../pipe/pipe.module';
import { EditListComponent } from './';

@NgModule({
	declarations: [
		EditListComponent
	],
	exports: [
		EditListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		PipesModule,
		EditformModule
	]
})
export class EditListModule {}
