import * as path from "path";

export class TemplateMetadata {
    fullUrl: string;
    relativeUrl: string;
}

export class BlueprintManagerJS {
    constructor(private $fs: IFileSystem) {}

    public listTemplates(blueprintType: string): TemplateMetadata[] {
        const directory = this.getSourcePath(blueprintType);
        return this.findAllTemplates(directory, "");
    }

    private findAllTemplates(
        fullPath: string,
        relativePath: string
    ): TemplateMetadata[] {
        const items: TemplateMetadata[] = [];

        const directoryContents = this.$fs.readDirectory(fullPath);

        directoryContents.forEach(itemName => {
            let fullItemPath = path.join(fullPath, itemName);
            let relativeItemPath = path.join(relativePath, itemName);

            if (this.isDirectory(fullItemPath)) {
                const newItems = this.findAllTemplates(
                    fullItemPath,
                    relativeItemPath
                );
                items.push(...newItems);
            } else {
                items.push({
                    fullUrl: fullItemPath,
                    relativeUrl: relativeItemPath
                });
            }
        });

        return items;
    }

    private isDirectory(url: string) {
        const stat = this.$fs.getFsStats(url);

        return stat.isDirectory();
    }

    private getSourcePath(blueprintType: string): string {
        const blueprintsDir = this.getPathToBlueprints();

        return path.join(blueprintsDir, blueprintType, "files");
    }

    private getPathToBlueprints(): string {
        return path.join(__dirname, "..", "blueprints");
    }
}

$injector.register("blueprintManagerJS", BlueprintManagerJS);
