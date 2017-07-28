import * as path from 'path';

// $injector is global object created by {N} CLI when its process starts, so it can be used in the extensions.

// The purpose of bootstrap file is to define in which file injected module can be found.
// When any code tries to resolve the injected module, the $injector tries to find it in the file declared here.
// The file should contain a registration of the module, the name of the module must be the same as the one declared as a first argument of injector's `require` method
$injector.require('generatorService', path.join(__dirname, 'generator.service'));

// Commands are specialized as they are something that user writes on the terminal.
// All commands are registered with `registerCommand` method in the file where's their source code. In the bootstrap the must be required with `requireCommand`.
// $injector.requireCommand('generate|*default', path.join(__dirname, 'module-command'));
// $injector.requireCommand('g|*default', path.join(__dirname, 'module-command'));
$injector.requireCommand('generate|module', path.join(__dirname, 'generate-module.command'));
$injector.requireCommand('g|module', path.join(__dirname, 'generate-module.command'));

$injector.requireCommand('generate|shared-module', path.join(__dirname, 'generate-shared-module.command'));
$injector.requireCommand('g|shared-module', path.join(__dirname, 'generate-shared-module.command'));

$injector.require('blueprintManager', path.join(__dirname, 'blueprint-manager'));
