import { GeneratorService } from "./generator.service";

class GenerateModuleCommand {
	// $errors and $logger are injected by CLI directly
	// $generatorService is declared in the extension and CLI's injector will inject it here as well.
	// Everything declared in one extension can be injected in the constructors of other extensions.
	constructor(private $errors: IErrors,
		private $logger: ILogger,
		// private $projectDataService: IProjectDataService,
		private $generatorService: GeneratorService) {
	}

	// canExecute method should return a promise with boolean result. In case result is 'true', the command can be executed.
	// canExecute is executed before the execute method and its purpose is to validate args passed by user.
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

			this.$errors.failWithoutHelp(`You should pass at least one argument to 'module' command.`);
		});
	}

	// execute method is the real execution of command. It should return a Promise<void>.
	execute(args: string[]) {
		return new Promise((resolve, reject) => {
			// const projectData = this.$projectDataService.getProjectData('./nativescript');

			// printMarkdown method allows support for Markdown syntax in the terminal.
			const message = this.$generatorService.generateModule(args[0]);
			this.$logger.printMarkdown(message);

			resolve();
		});
	}
}

// $injector.registerCommand('generate|*default', ModuleCommand);
// $injector.registerCommand('g|*default', ModuleCommand);

$injector.registerCommand('generate|module', GenerateModuleCommand);
$injector.registerCommand('g|module', GenerateModuleCommand);
