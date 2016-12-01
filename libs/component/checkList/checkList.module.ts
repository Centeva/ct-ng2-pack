import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { CheckListComponent	} from './';

@NgModule({
	declarations: [
		CheckListComponent
	],
	exports: [
		CheckListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		MdCheckboxModule
	]
})
export class CheckListModule {}
