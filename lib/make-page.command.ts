import { GeneratorServiceJS } from "./generator-js.service";
import { ValidationServiceJS } from "./validation-js.service";
import * as path from "path";

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
            // if (
            //     this.$validationServiceJS.isJavascriptNativeScriptProject() ===
            //     false
            // ) {
            //     this.$errors.failWithoutHelp(
            //         "Javascript NativeScript project not found at the current location."
            //     );
            // }

            if (args.length !== 1 && args.length !== 2) {
                this.$errors.failWithoutHelp(
                    "This command requires one or two arguments."
                );
            }

            if (args.length === 1) {
                if (
                    this.$validationServiceJS.checkIfPageExists(
                        DefaultSrcPath.NATIVESCRIPT,
                        args[0]
                    )
                ) {
                    this.$errors.failWithoutHelp(
                        `${args[0]} page already exists`
                    );
                }
            } else if (args.length === 2) {
                if (
                    this.$validationServiceJS.checkIfPageExistsInFolder(
                        DefaultSrcPath.NATIVESCRIPT,
                        args[0],
                        args[1]
                    )
                ) {
                    this.$errors.failWithoutHelp(
                        `${args[0]} page already exists in ${args[1]} folder`
                    );
                }
            }

            resolve(true);
        });
    }

    execute(args: string[]) {
        return new Promise((resolve, reject) => {
            let message = "";

            if (args.length === 1) {
                message = this.generatePage(args[0]);
            } else {
                message = this.generatePageInFolder(args[0], args[1]);
            }

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

    public generatePageInFolder(name: string, folderName: string) {
        const modulePath = path.join(DefaultSrcPath.NATIVESCRIPT, folderName);
        return this.$generatorServiceJS.generate(name, "page", modulePath);
    }
}

$injector.registerCommand(
    ["make|page", "m|page", "make|p", "m|p"],
    MakePageCommand
);
