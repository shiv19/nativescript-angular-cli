# nativescript-angular-cli
NativeScript CLI command extensions to add some of the Angular CLI commands.

## Installation
Just execute `tns extension install nativescript-angular-cli`

The package will be installed to:
* `~/.local/share/.nativescript-cli/extensions/` on macOS and Linux
* `%APPDATA%/.nativescript-cli/extensions/`on Windows

> NOTE: You need NativeScript CLI 3.0.0 or later. You can install latest version by executing `npm i -g nativescript`.

## Usage
To generate a component, run:
`tns generate component <component-name>`
`tns g c <component-name>`

To create a module, run:
`tns generate module <module-name>`
`tns g m <module-name>`

To create a service, run:
`tns generate service <service-name>`
`tns g s <service-name>`

## TeamMaestro Shareable Components/Modules generators

To generate a shareable module run:
`tns generate shared-module <module-name>`
`tns g sm <module-name>`
