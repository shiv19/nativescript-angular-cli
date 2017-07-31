import { GeneratorService } from './generator.service';
import { ValidationService } from './validation.service';

import * as stringUtils from './cli-string-utils';
import * as path from 'path';

import { DefaultSrcPath } from './constants';

class GenerateComponentCommand {
	constructor(private $errors: IErrors,
		private $logger: ILogger,
		private $generatorService: GeneratorService,
		private $validationService: ValidationService) {
	}

	canExecute(args: string[]) {
		return new Promise((resolve, reject) => {
			if (this.$validationService.isAngularNativeScriptProject() === false) {
				this.$errors.failWithoutHelp('Angular NativeScript project not found at the current location.');
			}

			if (args.length !== 1 && args.length !== 2) {
				this.$errors.failWithoutHelp('This command requires one or two argumentsxw.');
			}

			if (args.length === 1) {
				if (this.$validationService.checkIfComponentExists(DefaultSrcPath.NATIVESCRIPT, args[0])) {
					this.$errors.failWithoutHelp(`${args[0]} component already exists`);
				}
			} else if (args.length === 2) {
				if (this.$validationService.checkIfComponentExistsInModule(DefaultSrcPath.NATIVESCRIPT, args[0], args[1])) {
					this.$errors.failWithoutHelp(`${args[0]} component already exists in ${args[1]} module`);
				}
			}

			resolve(true);
		});
	}

	execute(args: string[]) {
		return new Promise((resolve, reject) => {
			let message = '';

			if (args.length === 1) {
				message = this.generateComponent(args[0]);
			} else {
				message = this.generateComponentInModule(args[0], args[1]);
			}

			this.$logger.printMarkdown(message);

			resolve();
		});
	}

	public generateComponent(name: string): string {
		return this.$generatorService.generate(name, 'component', DefaultSrcPath.NATIVESCRIPT);
	}

	public generateComponentInModule(name: string, moduleName: string) {
		// The path should be something like src/module-name/components
		const modulePath = path.join(DefaultSrcPath.NATIVESCRIPT, stringUtils.dasherize(moduleName), 'components');
		return this.$generatorService.generate(name, 'component', modulePath);
	}
}

$injector.registerCommand([
	'generate|component',
	'g|component',
	'generate|c',
	'g|c'
], GenerateComponentCommand);
