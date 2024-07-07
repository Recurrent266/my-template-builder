// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { mkdtemp, rm } from 'fs/promises';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  replaceInFile,
  renameFile,
  deleteFolder,
  copyFilesAndFolders,
} from '../../src/utils/replace-placeholders';

let tempDir: string;

beforeAll(async () => {
  tempDir = await mkdtemp('test-');
});

afterAll(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

describe('replaceInFile', () => {
  it('replaces placeholders in a file', () => {
    const FILE_PATH = path.join(tempDir, 'test.txt');
    fs.writeFileSync(FILE_PATH, 'Hello, ${name}!');

    replaceInFile(FILE_PATH, [[/\${name}/g, 'John']]);

    const CONTENT = fs.readFileSync(FILE_PATH, 'utf-8');
    expect(CONTENT).toBe('Hello, John!');
  });
});

describe('renameFile', () => {
  it('renames a file', () => {
    const OLD_PATH = path.join(tempDir, '${app}.txt');
    const NEW_PATH = path.join(tempDir, 'MyApp.txt');
    fs.writeFileSync(OLD_PATH, '');

    renameFile(OLD_PATH, NEW_PATH);

    expect(fs.existsSync(OLD_PATH)).toBe(false);
    expect(fs.existsSync(NEW_PATH)).toBe(true);
  });
});

describe('deleteFolder', () => {
  it('deletes a folder', () => {
    deleteFolder(tempDir);
    expect(fs.existsSync(tempDir)).toBe(false);
  });
});

describe('copyFilesAndFolders', () => {
  let sourceDir: string;
  let destDir: string;

  beforeEach(async () => {
    sourceDir = await mkdtemp('test-source-');
    destDir = await mkdtemp('test-dest-');
  });

  afterEach(async () => {
    await rm(sourceDir, { recursive: true, force: true });
    await rm(destDir, { recursive: true, force: true });
  });

  it('copies files and folders with placeholders', () => {
    const FILE_1_PATH = path.join(sourceDir, 'file1.txt');
    const FILE_2_PATH = path.join(sourceDir, 'folder', 'file2.txt');

    fs.writeFileSync(FILE_1_PATH, 'Hello ${Name}');
    fs.mkdirSync(path.join(sourceDir, 'folder'));
    fs.writeFileSync(FILE_2_PATH, 'Your name is ${name}.');

    copyFilesAndFolders(sourceDir, destDir, 'My Project');

    expect(fs.readFileSync(path.join(destDir, 'file1.txt'), 'utf-8')).toBe(
      'Hello My Project',
    );
    expect(
      fs.readFileSync(path.join(destDir, 'folder', 'file2.txt'), 'utf-8'),
    ).toBe('Your name is my Project.');
  });

  it('copies files and folders without placeholders', () => {
    const FILE_1_PATH = path.join(sourceDir, 'file1.txt');
    fs.writeFileSync(FILE_1_PATH, 'Hello world!');

    copyFilesAndFolders(sourceDir, destDir, 'My Project');

    expect(fs.readFileSync(path.join(destDir, 'file1.txt'), 'utf-8')).toBe(
      'Hello world!',
    );
  });

  it('copies files and folders with nested placeholders', () => {
    const FILE_1_PATH = path.join(sourceDir, 'file1.txt');
    const FILE_2_PATH = path.join(sourceDir, 'folder', 'file2.txt');

    fs.writeFileSync(FILE_1_PATH, 'Hello ${Name}!');
    fs.mkdirSync(path.join(sourceDir, 'folder'));
    fs.writeFileSync(FILE_2_PATH, 'Your name is ${Name} (${name}).');

    copyFilesAndFolders(sourceDir, destDir, 'My Project');

    expect(fs.readFileSync(path.join(destDir, 'file1.txt'), 'utf-8')).toBe(
      'Hello My Project!',
    );
    expect(
      fs.readFileSync(path.join(destDir, 'folder', 'file2.txt'), 'utf-8'),
    ).toBe('Your name is My Project (my Project).');
  });

  it('overwrites existing files and folders in destination', () => {
    const FILE_1_PATH = path.join(sourceDir, 'file1.txt');
    fs.writeFileSync(FILE_1_PATH, 'New content');

    const DEST_FILE_PATH = path.join(destDir, 'file1.txt');
    fs.writeFileSync(DEST_FILE_PATH, 'Old content');

    copyFilesAndFolders(sourceDir, destDir, 'My Project');

    expect(fs.readFileSync(DEST_FILE_PATH, 'utf-8')).toBe('New content');
  });

  it('handles empty source directory', () => {
    copyFilesAndFolders(sourceDir, destDir, 'My Project');
    expect(fs.readdirSync(destDir)).toHaveLength(0);
  });
});
