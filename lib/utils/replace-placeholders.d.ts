export declare const replaceInFile: (filePath: string, replacements: Array<[RegExp, string]>) => void;
export declare const renameFile: (filePath: string, newFilePath: string) => void;
export declare const deleteFolder: (folderPath: string) => void;
export declare const copyFilesAndFolders: (sourcePath: string, destinationPath: string, projectName: string) => void;
export declare const getServiceName: (folderPath: string) => string;
