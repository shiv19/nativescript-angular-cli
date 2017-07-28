import { NgModule } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './<%= dasherizedModuleName %>.common';

@NgModule({
	imports: [
		...SHARED_MODULES,
	],
	declarations: [
		...COMPONENT_DECLARATIONS
	],
})
export class <%= classifiedModuleName %>Module { }
