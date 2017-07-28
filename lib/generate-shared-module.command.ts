import { GeneratorService } from "./generator.service";

class GenerateSharedModuleCommand {
	constructor(private $errors: IErrors,
		private $logger: ILogger,
		// private $projectDataService: IProjectDataService,
		private $generatorService: GeneratorService) {
	}

	canExecute(args: string[]) {
		return new Promise((resolve, reject) => {
			console.log('Can Execute');
			if (args.length > 1) {
				this.$errors.failWithoutHelp('This command requires one argument.');
			}

			if (args.length) {
				resolve(true);
				return;
			}

			this.$errors.failWithoutHelp(`You should pass at least one argument to 'generate shared-module' command.`);
		});
	}

	execute(args: string[]) {
		return new Promise((resolve, reject) => {
			// printMarkdown method allows support for Markdown syntax in the terminal.
			const message = this.$generatorService.generateSharedModule(args[0]);
			this.$logger.printMarkdown(message);

			resolve();
		});
	}
}

$injector.registerCommand(['generate|shared-module',
	'g|shared-module',
	'generate|sm',
	'g|sm'
], GenerateSharedModuleCommand);
