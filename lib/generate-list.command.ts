class GenerateListCommand {
	constructor(private $logger: ILogger) {
	}

	canExecute(args: string[]) {
		return new Promise((resolve, reject) => {

			resolve(true);
		});
	}

	execute(args: string[]) {
		return new Promise((resolve, reject) => {
			let message = `List of all available commands:
\`tns g m <name>\` => tns generate module <name>
\`tns g c <name>\` => tns generate component <name>
\`tns g c <name> <module-name>\` => tns generate component <name> <module-name>
\`tns g s <name>\` => tns generate service <name>

For shared projects with \`native-angular-seed\`:
\`tns g sm <name>\` => tns generate shared-module <name>
\`tns g sc <name>\` => tns generate shared-component <name>
\`tns g sc <name> <module-name>\` => tns generate shared-component <name> <module-name>`;

			this.$logger.printMarkdown(message);

			resolve();
		});
	}
}

$injector.registerCommand([
	'generate|*default',
	'g|*default',
	'generate|list',
	'g|list'
], GenerateListCommand);
