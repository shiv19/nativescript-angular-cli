// const moduleTemplates = require('../blueprints/module-template').moduleTemplates;
import { BlueprintManager, TemplateMetadata } from "./blueprint-manager";

import * as stringUtils from './cli-string-utils';
import * as path from 'path';

// const defaultPath = 'src';
const dasherizedRegExp = new RegExp('<%= dasherizedModuleName %>', 'g');
const classifiedRegExp = new RegExp('<%= classifiedModuleName %>', 'g');
const nameRegExp = new RegExp('__name__', 'g');

export class GeneratorService {

	constructor(private $fs: IFileSystem,
		private $blueprintManager: BlueprintManager) { }

		/**
		 * 
		 * @param name the name of the module/component/pipe
		 * @param blueprintType should match the folder structure at blueprints/
		 * @param relativePath the path of where the project will be generated
		 */
		public generate(name: string, blueprintType: string, relativePath: string) {
			const classifiedName = stringUtils.classify(name);
			const dasherizedName = stringUtils.dasherize(name);
			console.log(`Prepared classifiedName: ${classifiedName} dasherizedName: ${dasherizedName}`);

			const items = this.$blueprintManager.listTemplates(blueprintType);

			this.generateFiles(items, relativePath, classifiedName, dasherizedName);

			return `${classifiedName}Module has been created.`;
		}

		private generateFiles(templates: TemplateMetadata[], relativePath: string, classifiedName: string, dasherizedName: string) {
			templates.forEach(template => {
				const fileUrl = this.parseFileUrl(relativePath, template.relativeUrl, dasherizedName);

				const templateData = this.$fs.readText(template.fullUrl);
				const data = this.parseData(templateData, classifiedName, dasherizedName);

				this.$fs.writeFile(fileUrl, data);
			});
		}

		private parseData(data: string, classifiedName: string, dasherizedName: string) {
			return data.replace(classifiedRegExp, classifiedName).replace(dasherizedRegExp, dasherizedName);
		}

		private parseFileUrl(relativePath: string, url: string, dasherizedName: string) {
			return path.join(relativePath, url.replace(nameRegExp, dasherizedName));
		}
	}

	$injector.register('generatorService', GeneratorService);
