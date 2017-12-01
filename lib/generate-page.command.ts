import { GeneratorService } from "./generator.service";
import { ValidationService } from "./validation.service";

import { DefaultSrcPath } from "./constants";

class GeneratePageCommand {
    constructor(
        private $errors: IErrors,
        private $logger: ILogger,
        private $generatorService: GeneratorService,
        private $validationService: ValidationService
    ) {}

    canExecute(args: string[]) {
        return new Promise((resolve, reject) => {
            if (
                this.$validationService.isJavascriptNativeScriptProject() ===
                false
            ) {
                this.$errors.failWithoutHelp(
                    "Javascript NativeScript project not found at the current location."
                );
            }

            if (args.length !== 1) {
                this.$errors.failWithoutHelp(
                    "This command requires one argument."
                );
            }

            if (
                this.$validationService.checkIfPageExists(
                    DefaultSrcPath.NATIVESCRIPT,
                    args[0]
                )
            ) {
                this.$errors.failWithoutHelp(`${args[0]} page already exists`);
            }

            resolve(true);
        });
    }

    execute(args: string[]) {
        return new Promise((resolve, reject) => {
            const message = this.generatePage(args[0]);
            this.$logger.printMarkdown(message);

            resolve();
        });
    }

    public generatePage(name: string): string {
        return this.$generatorService.generate(
            name,
            "page",
            DefaultSrcPath.NATIVESCRIPT
        );
    }
}

$injector.registerCommand(
    ["generate|page", "g|page", "generate|p", "g|p"],
    GeneratePageCommand
);
