// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Testing } from 'projen/lib/testing';
import { KFinTechNestJSAppProject } from '../src';

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

test('TmsNestJSAppProject has reasonable configuration', () => {
  const PROJECT = new KFinTechNestJSAppProject({
    name: 'test',
    defaultReleaseBranch: 'main',
    // default settings
  });
  const SNAPSHOT = Testing.synth(PROJECT);

  expect(SNAPSHOT['tsconfig.json']).toMatchSnapshot();
  expect(SNAPSHOT['tsconfig.dev.json']).toMatchSnapshot();
  expect(SNAPSHOT['package.json']).toMatchSnapshot();
  expect(SNAPSHOT['.vscode/settings.json']).toMatchSnapshot();
  expect(SNAPSHOT['.vscode/extensions.json']).toMatchSnapshot();
  expect(SNAPSHOT['.eslintrc.json']).toMatchSnapshot();
  expect(SNAPSHOT['src/main.ts']).toBeDefined();
  expect(SNAPSHOT['test/jest-e2e.json']).toBeDefined();
});
