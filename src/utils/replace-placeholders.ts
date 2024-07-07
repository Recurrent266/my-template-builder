// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'process';

export const replaceInFile = (
  filePath: string,
  replacements: Array<[RegExp, string]>,
) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  fs.writeFileSync(filePath, content);
};

export const renameFile = (filePath: string, newFilePath: string) => {
  fs.renameSync(filePath, newFilePath);
};

export const deleteFolder = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }
};

export const copyFilesAndFolders = (
  sourcePath: string,
  destinationPath: string,
  projectName: string,
) => {
  const LOWER_PROJECT_NAME =
    projectName.charAt(0).toLowerCase() + projectName.slice(1);
  const UPPER_PROJECT_NAME =
    projectName.charAt(0).toUpperCase() + projectName.slice(1);

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  // Read all files and directories in the source path
  const FILES = fs.readdirSync(sourcePath);

  for (const FILE of FILES) {
    const SRC_PATH = path.join(sourcePath, FILE);
    const STATS = fs.statSync(SRC_PATH);

    if (STATS.isDirectory()) {
      let newFolderPath: string;
      if (FILE.includes('${app}')) {
        const NEW_FOLDER_NAME = FILE.replace('${app}', LOWER_PROJECT_NAME);
        newFolderPath = path.join(destinationPath, NEW_FOLDER_NAME);
        deleteFolder(newFolderPath); // Delete the existing folder
        fs.mkdirSync(newFolderPath, { recursive: true });
        copyFilesAndFolders(SRC_PATH, newFolderPath, projectName);
      } else {
        const FOLDER_PATH = path.join(destinationPath, FILE);
        deleteFolder(FOLDER_PATH); // Delete the existing folder
        fs.mkdirSync(FOLDER_PATH, { recursive: true });
        copyFilesAndFolders(SRC_PATH, FOLDER_PATH, projectName);
      }
    } else if (STATS.isFile()) {
      let newFilePath: string;
      if (FILE.includes('${app}')) {
        newFilePath = path.join(
          destinationPath,
          FILE.replace('${app}', LOWER_PROJECT_NAME),
        );
      } else {
        newFilePath = path.join(destinationPath, FILE);
      }

      const TEMP_FILE_PATH = path.join(destinationPath, `temp_${FILE}`);
      fs.copyFileSync(SRC_PATH, TEMP_FILE_PATH);

      replaceInFile(TEMP_FILE_PATH, [
        [/\${name}/g, LOWER_PROJECT_NAME],
        [/\${Name}/g, UPPER_PROJECT_NAME],
      ]);

      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath); // Delete the existing file
      }

      fs.copyFileSync(TEMP_FILE_PATH, newFilePath);
      renameFile(TEMP_FILE_PATH, newFilePath);
    }
  }
};

export const getServiceName = (folderPath: string) => {
  if (folderPath) {
    return folderPath.split(path.sep).slice(-1)[0];
  } else {
    return process.cwd().split(path.sep).slice(-1)[0];
  }
};
