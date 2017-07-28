import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'seed-<%= dasherizedModuleName %>',
	templateUrl: './<%= dasherizedModuleName %>.component.html',
	styleUrls: ['./<%= dasherizedModuleName %>.component.scss']
})
export class <%= classifiedModuleName %>Component implements OnInit {

	constructor() { }

	ngOnInit() { }

}
