import { Routes } from '@angular/router';
// app
import { <%= classifiedModuleName %>Component } from './components/<%= dasherizedModuleName %>/<%= dasherizedModuleName %>.component';

export const <%= classifiedModuleName %>Routes: Routes = [
		{
				path: '',
				component: <%= classifiedModuleName %>Component
		}
];
