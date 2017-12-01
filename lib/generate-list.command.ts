class GenerateListCommand {
    constructor(private $logger: ILogger) {}

    canExecute(args: string[]) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    execute(args: string[]) {
        return new Promise((resolve, reject) => {
            let message = `List of all available commands:
\`tns g p <name>\` => tns generate page <name>`;

            this.$logger.printMarkdown(message);

            resolve();
        });
    }
}

$injector.registerCommand(
    ["generate|*default", "g|*default", "generate|list", "g|list"],
    GenerateListCommand
);
