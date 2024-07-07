// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Testing } from 'projen/lib/testing';
import { KFinTechTypeScriptAppProject } from '../src/';

const ORIGINAL_PROCESS = process;
beforeEach(() => {
  global.process = {
    ...ORIGINAL_PROCESS,
    versions: { ...ORIGINAL_PROCESS.versions, node: '18.18.2' },
  };
});
afterEach(() => {
  global.process = ORIGINAL_PROCESS;
});

test('KFinTechTypeScriptAppProject has required configuration', () => {
  const PROJECT = new KFinTechTypeScriptAppProject({
    name: 'test',
    defaultReleaseBranch: 'main',
    // default settings
  });
  // synthSnapshot(project, { parseJson: true });
  const SNAPSHOT = Testing.synth(PROJECT);

  expect(SNAPSHOT['tsconfig.json']).toMatchSnapshot();
  expect(SNAPSHOT['tsconfig.dev.json']).toMatchSnapshot();
  expect(SNAPSHOT['package.json']).toMatchSnapshot();
  expect(SNAPSHOT['.vscode/settings.json']).toMatchSnapshot();
  expect(SNAPSHOT['.vscode/extensions.json']).toMatchSnapshot();
  expect(SNAPSHOT['.eslintrc.json']).toMatchSnapshot();
  expect(SNAPSHOT['.nvmrc']).toMatchSnapshot();
  expect(SNAPSHOT['src/index.ts']).toBeDefined();
  expect(SNAPSHOT['src/hello.ts']).toBeDefined();
  expect(SNAPSHOT['test/hello.test.ts']).toBeDefined();
  /* eslint-disable */
  const TASKS = SNAPSHOT['.projen/tasks.json']?.tasks;
  const BUNDLE_TASK = TASKS['bundle:index'];
  const BUNDLE_COMMAND = BUNDLE_TASK.steps[0]?.exec;
  /* eslint-disable */
  expect(BUNDLE_COMMAND).toContain('--format=esm');
});

test('KFinTechTypeScriptAppProject no vscode settings generated', () => {
  const PROJECT = new KFinTechTypeScriptAppProject({
    name: 'test',
    defaultReleaseBranch: 'main',
    vscode: false,
    // default settings
  });
  // synthSnapshot(project, { parseJson: true });
  const SNAPSHOT = Testing.synth(PROJECT);

  expect(SNAPSHOT['.vscode/settings.json']).toBeUndefined();
  expect(SNAPSHOT['.vscode/extensions.json']).toBeUndefined();
});

test('KFinTechTypeScriptAppProject accepts eslintFixableAsWarn=false', () => {
  const PROJECT = new KFinTechTypeScriptAppProject({
    name: 'test',
    defaultReleaseBranch: 'main',
    eslintFixableAsWarn: false,
    // default settings
  });
  // synthSnapshot(project, { parseJson: true });
  const SNAPSHOT = Testing.synth(PROJECT);

  expect(SNAPSHOT['.eslintrc.json']).toMatchSnapshot('.eslintrc.json');
});
