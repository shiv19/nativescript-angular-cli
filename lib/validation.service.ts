import * as stringUtils from './cli-string-utils';
import * as path from 'path';

export class ValidationService {
	constructor(private $projectDataService: IProjectDataService,
		private $fs: IFileSystem) {
	}

	public isAngularNativeScriptProject(url: string = '.') {
		try {
			const projectData = this.$projectDataService.getProjectData(url);

			return projectData.projectType === 'Angular';

		} catch (exception) {
			return false;
		}
	}

	public isAngularNativeSeed(url: string = './nativescript') {
		try {
			const projectData = this.$projectDataService.getProjectData(url);

			return projectData.projectType === 'Angular';

		} catch (exception) {
			return false;
		}
	}

	public checkIfComponentExists(srcPath: string, name: string) {
		const dasherizedComponentName = stringUtils.dasherize(name);

		const fullUrl = path.join(srcPath, dasherizedComponentName);
		return this.$fs.exists(fullUrl);
	}

	public checkIfComponentExistsInModule(srcPath: string, name: string, moduleName: string) {
		const dasherizedComponentName = stringUtils.dasherize(name);
		const dasherizedModuleName = stringUtils.dasherize(moduleName);

		const fullUrl = path.join(srcPath, dasherizedModuleName, 'components', dasherizedComponentName);
		return this.$fs.exists(fullUrl);
	}

	public checkIfModuleExists(srcPath: string, name: string) {
		const dasherizedModuleName = stringUtils.dasherize(name);

		const fullUrl = path.join(srcPath, dasherizedModuleName);
		return this.$fs.exists(fullUrl);
	}

	public checkIfServiceExists(srcPath: string, name: string) {
		const serviceName = stringUtils.dasherize(name) + '.service.ts';
		const fullUrl = path.join(srcPath, serviceName);

		return this.$fs.exists(fullUrl);
	}
}

$injector.register('validationService', ValidationService);
