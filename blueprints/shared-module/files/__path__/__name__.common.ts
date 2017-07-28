// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { <%= classifiedModuleName %>Routes } from './<%= dasherizedModuleName %>.routes';
import { <%= classifiedModuleName %>Component } from './components/<%= dasherizedModuleName %>/<%= dasherizedModuleName %>.component';

export const SHARED_MODULES: any[] = [
	SharedModule,
	RouterModule.forChild(<any><%= classifiedModuleName %>Routes),
	TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
	<%= classifiedModuleName %>Component
];
