import * as path from "path";

// $injector is global object maked by {N} CLI when its process starts, so it can be used in the extensions.

// The purpose of bootstrap file is to define in which file injected module can be found.
// When any code tries to resolve the injected module, the $injector tries to find it in the file declared here.
// The file should contain a registration of the module, the name of the module must be the same as the one declared as a first argument of injector's `require` method
$injector.require(
    "generatorServiceJS",
    path.join(__dirname, "generator-js.service")
);
$injector.require(
    "validationServiceJS",
    path.join(__dirname, "validation-js.service")
);

// Commands are specialized as they are something that user writes on the terminal.
// All commands are registered with `registerCommand` method in the file where's their source code. In the bootstrap the must be required with `requireCommand`.

$injector.requireCommand(
    ["make|*default", "m|*default", "make|list", "m|list"],
    path.join(__dirname, "make-list.command")
);

$injector.requireCommand(
    ["make|page", "m|page", "make|p", "m|p"],
    path.join(__dirname, "make-page.command")
);

$injector.require(
    "blueprintManagerJS",
    path.join(__dirname, "blueprint-manager-js")
);
