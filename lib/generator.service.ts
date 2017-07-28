// const moduleTemplates = require('../blueprints/module-template').moduleTemplates;
import { BlueprintManager, TemplateMetadata } from "./blueprint-manager";

const stringUtils = require('./ember-cli-string-utils');
import * as path from 'path';

// const defaultPath = 'src';
const dasherizedRegExp = new RegExp('<%= dasherizedModuleName %>', 'g');
const classifiedRegExp = new RegExp('<%= classifiedModuleName %>', 'g');
const pathRegExp = new RegExp('__path__', 'g');
const nameRegExp = new RegExp('__name__', 'g');

export class GeneratorService {

	constructor(private $fs: IFileSystem,
		private $blueprintManager: BlueprintManager) {

		}

		public generateModule(name: string, destinationRoot: string = 'src/app'): string {
			return this.generate(name, 'module', destinationRoot);
		}

		public generateSharedModule(name: string, destinationRoot: string = 'src'): string {
			return this.generate(name, 'shared-module', destinationRoot);
		}

		/**
		 * 
		 * @param name the name of the module/component/pipe
		 * @param blueprintType should match the folder structure at blueprints/
		 * @param destinationRoot the path of where the project will be generated
		 */
		private generate(name: string, blueprintType: string, destinationRoot: string) {
			const classifiedName = stringUtils.classify(name);
			const dasherizedName = stringUtils.dasherize(name);
			console.log(`Prepared classifiedName: ${classifiedName} dasherizedName: ${dasherizedName}`);

			const items = this.$blueprintManager.listTemplates(blueprintType);
			console.log(`all items: ${JSON.stringify(items,null, 2)}`);

			this.generateFiles(items, destinationRoot, classifiedName, dasherizedName);

			return `${classifiedName}Module has been created.`;
		}

		private generateFiles(templates: TemplateMetadata[], destinationRoot: string, classifiedName: string, dasherizedName: string) {
			templates.forEach(template => {
				const fileUrl = this.parseFileUrl(destinationRoot, template.relativeUrl, dasherizedName);

				const templateData = this.$fs.readText(template.fullUrl);
				const data = this.parseData(templateData, classifiedName, dasherizedName);

				this.$fs.writeFile(fileUrl, data);
			});
		}

		private parseData(data: string, classifiedName: string, dasherizedName: string) {
			return data.replace(classifiedRegExp, classifiedName).replace(dasherizedRegExp, dasherizedName);
		}

		private parseFileUrl(destinationRoot: string, url: string, dasherizedName: string) {
			return path.join(destinationRoot, url.replace(pathRegExp, dasherizedName).replace(nameRegExp, dasherizedName));
		}
	}

	$injector.register('generatorService', GeneratorService);
