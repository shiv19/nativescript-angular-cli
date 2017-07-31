import * as path from 'path';

// $injector is global object created by {N} CLI when its process starts, so it can be used in the extensions.

// The purpose of bootstrap file is to define in which file injected module can be found.
// When any code tries to resolve the injected module, the $injector tries to find it in the file declared here.
// The file should contain a registration of the module, the name of the module must be the same as the one declared as a first argument of injector's `require` method
$injector.require('generatorService', path.join(__dirname, 'generator.service'));
$injector.require('validationService', path.join(__dirname, 'validation.service'));

// Commands are specialized as they are something that user writes on the terminal.
// All commands are registered with `registerCommand` method in the file where's their source code. In the bootstrap the must be required with `requireCommand`.

$injector.requireCommand([
	'generate|*default',
	'g|*default',
	'generate|list',
	'g|list'
], path.join(__dirname, 'generate-list.command'));

$injector.requireCommand([
	'generate|module',
	'g|module',
	'generate|m',
	'g|m'
], path.join(__dirname, 'generate-module.command'));

$injector.requireCommand([
	'generate|component',
	'g|component',
	'generate|c',
	'g|c'
], path.join(__dirname, 'generate-component.command'));

$injector.requireCommand([
	'generate|service',
	'g|service',
	'generate|s',
	'g|s'
], path.join(__dirname, 'generate-service.command'));

// Shared commands
$injector.requireCommand([
	'generate|shared-module',
	'g|shared-module',
	'generate|sm',
	'g|sm'
], path.join(__dirname, 'generate-shared-module.command'));

$injector.requireCommand([
	'generate|shared-component',
	'g|shared-component',
	'generate|sc',
	'g|sc'
], path.join(__dirname, 'generate-shared-component.command'));

$injector.require('blueprintManager', path.join(__dirname, 'blueprint-manager'));
