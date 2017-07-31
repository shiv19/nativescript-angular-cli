import { GeneratorService } from './generator.service';
import { ValidationService } from './validation.service';

import * as stringUtils from './cli-string-utils';
import * as path from 'path';
import { DefaultSrcPath } from './constants';

class GenerateSharedComponentCommand {
	constructor(private $errors: IErrors,
		private $logger: ILogger,
		private $generatorService: GeneratorService,
		private $validationService: ValidationService) {
	}

	canExecute(args: string[]) {
		return new Promise((resolve, reject) => {
			if (this.$validationService.isAngularNativeSeed() === false) {
				this.$errors.failWithoutHelp('This command should be run from the root of angular-native-seed.');
			}

			if (args.length !== 1 && args.length !== 2) {
				this.$errors.failWithoutHelp('This command requires one or two arguments argument.');
			}

			if (args.length === 1) {
				if (this.$validationService.checkIfComponentExists(DefaultSrcPath.SHARED, args[0])) {
					this.$errors.failWithoutHelp(`${args[0]} component already exists`);
				}
			} else if (args.length === 2) {
				if (this.$validationService.checkIfComponentExistsInModule(DefaultSrcPath.SHARED, args[0], args[1])) {
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
				message = this.generateSharedComponent(args[0]);
			} else {
				message = this.generateSharedComponentInModule(args[0], args[1]);
			}

			this.$logger.printMarkdown(message);

			resolve();
		});
	}
	public generateSharedComponent(name: string): string {
		return this.$generatorService.generate(name, 'shared-component', DefaultSrcPath.SHARED);
	}

	public generateSharedComponentInModule(name: string, moduleName: string) {
		const modulePath = path.join(DefaultSrcPath.SHARED, stringUtils.dasherize(moduleName), 'components');
		return this.$generatorService.generate(name, 'shared-component', modulePath);
	}
}

$injector.registerCommand([
	'generate|shared-component',
	'g|shared-component',
	'generate|sc',
	'g|sc'
], GenerateSharedComponentCommand);
