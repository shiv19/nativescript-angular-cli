import * as path from "path";

// $injector is global object created by {N} CLI when its process starts, so it can be used in the extensions.

// The purpose of bootstrap file is to define in which file injected module can be found.
// When any code tries to resolve the injected module, the $injector tries to find it in the file declared here.
// The file should contain a registration of the module, the name of the module must be the same as the one declared as a first argument of injector's `require` method
$injector.require(
    "generatorService",
    path.join(__dirname, "generator.service")
);
$injector.require(
    "validationService",
    path.join(__dirname, "validation.service")
);

// Commands are specialized as they are something that user writes on the terminal.
// All commands are registered with `registerCommand` method in the file where's their source code. In the bootstrap the must be required with `requireCommand`.

$injector.requireCommand(
    ["create|*default", "c|*default", "create|list", "c|list"],
    path.join(__dirname, "create-list.command")
);

$injector.requireCommand(
    ["create|page", "c|page", "create|p", "c|p"],
    path.join(__dirname, "create-page.command")
);

$injector.require(
    "blueprintManager",
    path.join(__dirname, "blueprint-manager")
);
