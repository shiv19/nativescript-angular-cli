import { GeneratorService } from "./generator.service";
import { ValidationService } from "./validation.service";

import { DefaultSrcPath } from './constants';

class GenerateSharedModuleCommand {
	constructor(private $errors: IErrors,
		private $logger: ILogger,
		private $generatorService: GeneratorService,
		private $validationService: ValidationService) {
	}

	canExecute(args: string[]) {
		return new Promise((resolve, reject) => {
			if (this.$validationService.isAngularNativeSeed() === false) {
				this.$errors.failWithoutHelp('This command should be run from the root of angular-native-seed');
			}

			if (args.length > 1) {
				this.$errors.failWithoutHelp('This command requires one argument.');
			}

			if (this.$validationService.checkIfModuleExists(DefaultSrcPath.SHARED, args[0])) {
				this.$errors.failWithoutHelp(`${args[0]} module already exists`);
			}

			resolve(true);
		});
	}

	execute(args: string[]) {
		return new Promise((resolve, reject) => {
			const message = this.generateSharedModule(args[0]);
			this.$logger.printMarkdown(message);

			resolve();
		});
	}

	public generateSharedModule(name: string): string {
		return this.$generatorService.generate(name, 'shared-module', DefaultSrcPath.SHARED);
	}
}

$injector.registerCommand(['generate|shared-module',
	'g|shared-module',
	'generate|sm',
	'g|sm'
], GenerateSharedModuleCommand);
