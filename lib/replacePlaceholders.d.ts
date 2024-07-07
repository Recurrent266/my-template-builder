declare const replaceInFile: (filePath: string, replacements: Array<[RegExp, string]>) => void;
declare const renameFile: (filePath: string, newFilePath: string) => void;
declare const deleteFolder: (folderPath: string) => void;
declare const copyFilesAndFolders: (sourcePath: string, destinationPath: string, projectName: string) => void;
export { replaceInFile, renameFile, deleteFolder, copyFilesAndFolders };
