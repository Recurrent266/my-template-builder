// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { cdk, javascript } from 'projen';
import { TrailingComma, UpdateSnapshot } from 'projen/lib/javascript';
import { projenrcEslintRules } from './.eslintrc.config';

const PROJECT = new cdk.JsiiProject({
  author: 'kfintech',
  authorOrganization: false,
  authorAddress: 'kfintech@example.com',
  npmAccess: javascript.NpmAccess.PUBLIC,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.3.0',
  github: false,
  name: 'kfintech-projen-projects',
  packageName: '@kfintech/kfintech-projen-projects',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/Recurrent266/my-template-builder.git',
  eslint: true,
  prettier: true,
  projenVersion: '>=0.79.23',

  //deps: ['js-yaml'],                /* Runtime dependencies of this module. */
  // description: undefined,
  /* The description(string) helps people understand purpose of the package. */
  devDeps: [] /* Build dependencies for this module. */,
  // packageName: undefined,  /* The "name" in package.json. */
  peerDeps: ['projen', 'constructs'],
  jest: true,
  jestOptions: {
    updateSnapshot: UpdateSnapshot.NEVER,
  },
});

PROJECT.prettier?.addOverride({
  files: '*',
  options: {
    singleQuote: true,
    trailingComma: 'all' as TrailingComma,
    printWidth: 80,
    semi: true,
    tabWidth: 2,
  },
});

// Add the ESLint configurations
PROJECT.eslint?.addRules(projenrcEslintRules);
PROJECT.eslint?.addPlugins('@typescript-eslint', 'import', 'prettier');
PROJECT.eslint?.addExtends(
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:import/typescript',
  'plugin:prettier/recommended',
);

if (PROJECT.jest) {
  PROJECT.testTask.env(
    'NODE_OPTIONS',
    '$NODE_OPTIONS --experimental-vm-modules',
  );
}
PROJECT.addBundledDeps('js-yaml', '@types/js-yaml');
PROJECT.gitignore.addPatterns(
  '.idea/',
  'samples/target/',
  '!/tsconfig.json',
  'package-lock.json',
  '!/.jsii'
);

PROJECT.tsconfigDev.addExclude('samples');

PROJECT.synth();
