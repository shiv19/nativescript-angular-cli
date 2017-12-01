class MakeListCommand {
    constructor(private $logger: ILogger) {}

    canExecute(args: string[]) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    execute(args: string[]) {
        return new Promise((resolve, reject) => {
            let message = `List of all available commands:
\`tns m p <name>\` => tns make page <name>`;

            this.$logger.printMarkdown(message);

            resolve();
        });
    }
}

$injector.registerCommand(
    ["make|*default", "m|*default", "make|list", "m|list"],
    MakeListCommand
);
