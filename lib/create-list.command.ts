class CreateListCommand {
    constructor(private $logger: ILogger) {}

    canExecute(args: string[]) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    execute(args: string[]) {
        return new Promise((resolve, reject) => {
            let message = `List of all available commands:
\`tns g p <name>\` => tns create page <name>`;

            this.$logger.printMarkdown(message);

            resolve();
        });
    }
}

$injector.registerCommand(
    ["create|*default", "c|*default", "create|list", "c|list"],
    CreateListCommand
);
