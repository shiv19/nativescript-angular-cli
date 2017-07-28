import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular';

import { <%= classifiedModuleName %>Routes } from './<%= dasherizedModuleName %>.routes';
import { <%= classifiedModuleName %>Component } from './components/<%= dasherizedModuleName %>/<%= dasherizedModuleName %>.component'

@NgModule({
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptRouterModule.forChild(<any><%= classifiedModuleName %>Routes)
	],
	declarations: [
	<%= classifiedModuleName %>Component
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class <%= classifiedModuleName %>Module { }
