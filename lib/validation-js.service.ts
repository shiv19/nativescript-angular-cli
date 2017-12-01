import * as stringUtils from "./cli-string-utils";
import * as path from "path";

export class ValidationServiceJS {
    constructor(
        private $projectDataService: IProjectDataService,
        private $fs: IFileSystem
    ) {}

    public isJavascriptNativeScriptProject(url: string = ".") {
        try {
            const projectData = this.$projectDataService.getProjectData(url);

            return projectData.projectType === "Javascript";
        } catch (exception) {
            return false;
        }
    }

    public checkIfPageExists(srcPath: string, name: string) {
        name = name.toLowerCase();
        const fullUrl = path.join(srcPath, name);
        return this.$fs.exists(fullUrl);
    }

    public checkIfPageExistsInFolder(
        srcPath: string,
        name: string,
        folderName: string
    ) {
        name = name.toLowerCase();

        const fullUrl = path.join(srcPath, folderName, name);
        return this.$fs.exists(fullUrl);
    }
}

$injector.register("validationServiceJS", ValidationServiceJS);
