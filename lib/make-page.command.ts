import { GeneratorServiceJS } from "./generator-js.service";
import { ValidationServiceJS } from "./validation-js.service";

import { DefaultSrcPath } from "./constants";

class MakePageCommand {
    constructor(
        private $errors: IErrors,
        private $logger: ILogger,
        private $generatorServiceJS: GeneratorServiceJS,
        private $validationServiceJS: ValidationServiceJS
    ) {}

    canExecute(args: string[]) {
        return new Promise((resolve, reject) => {
            if (
                this.$validationServiceJS.isJavascriptNativeScriptProject() ===
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
                this.$validationServiceJS.checkIfPageExists(
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
        return this.$generatorServiceJS.generate(
            name,
            "page",
            DefaultSrcPath.NATIVESCRIPT
        );
    }
}

$injector.registerCommand(
    ["make|page", "m|page", "make|p", "m|p"],
    MakePageCommand
);
