import { Routes } from '@angular/router';
// app
import { <%= classifiedModuleName %>Component } from './<%= dasherizedModuleName %>/<%= dasherizedModuleName %>.component';

export const <%= classifiedModuleName %>Routes: Routes = [
		{
				path: '',
				component: <%= classifiedModuleName %>Component
		}
];
