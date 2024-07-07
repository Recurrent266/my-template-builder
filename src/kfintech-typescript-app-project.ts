// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { sep } from 'path';
import { JsonPatch, TextFile, Component, SampleDir } from 'projen';
import {
  NodePackageManager,
  TrailingComma,
  TypeScriptModuleResolution,
  TypescriptConfigExtends,
  UpdateSnapshot,
} from 'projen/lib/javascript';
import {
  TypeScriptAppProject,
  TypeScriptProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript';
import { deepMerge } from 'projen/lib/util';
import { eslintOverrides, eslintRules } from './constants/eslint-config';
import {
  TSCONFIG_OPTIONS,
  TSCONFIG_OPTIONS_STRICT,
} from './constants/tsconfig-options';

export enum KFinTechTSConfigBase {
  NODE_VERSION = 'node18',
}

export interface KFinTechTypeScriptAppProjectOptions
  extends TypeScriptProjectOptions {
  // bundle dist using esbuild
  readonly addDefaultBundle?: boolean;
  // enable ESM
  readonly esmSupportConfig?: boolean;
  readonly eslintFixableAsWarn?: boolean;
  readonly nodeVersion?: string;
  readonly tsconfigBase?: KFinTechTSConfigBase;
  readonly tsconfigBaseDev?: KFinTechTSConfigBase;
  readonly tsconfigBaseStrictest?: boolean;
}

/**
 * Create a [TypeScriptAppProject]
 * @pjid kfintech-typescript-app
 */

export class KFinTechTypeScriptAppProject extends TypeScriptAppProject {
  constructor(options: KFinTechTypeScriptAppProjectOptions) {
    const DEFAULT_OPTIONS = {
      eslint: true,
      packageManager: NodePackageManager.NPM,
      prettier: true,
      projenrcTs: true,
      projenVersion: '>=0.79.23',
      nodeVersion: `v${process.versions.node}`,
      vscode: true,
      tsconfig: {
        compilerOptions: {
          ...TSCONFIG_OPTIONS,
          ...TSCONFIG_OPTIONS_STRICT,
          moduleResolution: TypeScriptModuleResolution.NODE16,
          noEmit: options.addDefaultBundle ?? true,
        },
        extends: TypescriptConfigExtends.fromPaths([
          `@tsconfig/${
            options.tsconfigBase ?? KFinTechTSConfigBase.NODE_VERSION
          }/tsconfig.json`,
        ]),
      },
      github: false,
      commitGenerated: false,
      release: false,
      tsconfigDev: {
        compilerOptions: {
          ...TSCONFIG_OPTIONS,
          moduleResolution: TypeScriptModuleResolution.NODE16,
          noEmit: true,
        },
        extends: TypescriptConfigExtends.fromPaths([
          `@tsconfig/${
            options.tsconfigBaseDev ?? KFinTechTSConfigBase.NODE_VERSION
          }/tsconfig.json`,
        ]),
      },
      jest: true,
      jestOptions: {
        updateSnapshot: UpdateSnapshot.NEVER,
      },
      tsJestOptions: {
        transformPattern: '^.+\\.m?[tj]sx?$',
        transformOptions: {
          useESM: options.esmSupportConfig ?? true,
        },
      },
      addDefaultBundle: true,
      esmSupportConfig: true,
      tsconfigBase: KFinTechTSConfigBase.NODE_VERSION,
      tsconfigBaseDev: KFinTechTSConfigBase.NODE_VERSION,
      tsconfigBaseStrictest: true,
    } satisfies Partial<KFinTechTypeScriptAppProjectOptions>;

    const MERGED_OPTIONS = deepMerge(
      [DEFAULT_OPTIONS, options],
      true,
    ) as KFinTechTypeScriptAppProjectOptions;

    super({ ...MERGED_OPTIONS, sampleCode: false });

    this.addDevDeps(
      ...new Set([
        `@tsconfig/${
          MERGED_OPTIONS.tsconfigBase ?? KFinTechTSConfigBase.NODE_VERSION
        }`,
        `@tsconfig/${
          MERGED_OPTIONS.tsconfigBaseDev ?? KFinTechTSConfigBase.NODE_VERSION
        }`,
      ]),
    );

    // Add the ESLint configuration
    this.eslint?.addRules(eslintRules);
    this.eslint?.addOverride(eslintOverrides);
    this.eslint?.addPlugins('@typescript-eslint', 'import', 'prettier');
    this.eslint?.addExtends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
    );

    this.prettier?.addOverride({
      files: '*',
      options: {
        singleQuote: true,
        trailingComma: 'all' as TrailingComma,
        semi: true,
        tabWidth: 2,
      },
    });

    if (MERGED_OPTIONS.eslintFixableAsWarn ?? true) {
      this.eslint?.addRules({
        'prettier/prettier': ['warn'],
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'key-spacing': ['warn'],
        'no-multiple-empty-lines': ['warn'],
        'no-trailing-spaces': ['warn'],
        'dot-notation': ['warn'],
      });
    }

    this.tryRemoveFile('.gitattributes');
    this.gitignore.removePatterns();

    if (MERGED_OPTIONS.nodeVersion) {
      new TextFile(this, '.nvmrc', {
        lines: [MERGED_OPTIONS.nodeVersion],
      });
    }

    if (MERGED_OPTIONS.esmSupportConfig) {
      this.package.addField('type', 'module');
      [this.tsconfig, this.tsconfigDev].forEach(
        (tsconfig) =>
          tsconfig &&
          tsconfig.file.patch(
            JsonPatch.add('/ts-node', {
              esm: true,
              preferTsExts: false,
              experimentalSpecifierResolution: 'node',
            }),
          ),
      );
    } else {
      [this.tsconfig, this.tsconfigDev].forEach(
        (tsconfig) =>
          tsconfig &&
          tsconfig.file.patch(
            JsonPatch.add('/ts-node', {
              compilerOptions: {
                module: 'commonjs',
              },
              preferTsExts: true,
              experimentalSpecifierResolution: 'node',
            }),
          ),
      );
    }

    if (MERGED_OPTIONS.jest && this.jest) {
      /* eslint-disable */
      this.jest.config.globals = undefined;
      this.jest.config.moduleNameMapper = {
        '^(\\.{1,2}/.*)\\.m?js$': '$1',
      };
      /* eslint-disable */
      if (MERGED_OPTIONS.esmSupportConfig ?? true) {
        this.testTask.env(
          'NODE_OPTIONS',
          '$(echo $NODE_OPTIONS --experimental-vm-modules)',
        );
      }
    }

    if (MERGED_OPTIONS.vscode) {
      if (!this.vscode?.settings) {
        throw new Error('vscode settings not found.');
      }
      if (!this.vscode?.extensions) {
        throw new Error('vscode extensions not found.');
      }
      const SETTINGS = this.vscode?.settings;
      SETTINGS.addSetting('jest.jestCommandLine', 'npm test --');
      SETTINGS.addSetting('jest.rootPath', './');

      const EXTESNIONS = this.vscode?.extensions;
      EXTESNIONS.addRecommendations(
        'dbaeumer.vscode-eslint',
        'Orta.vscode-jest',
      );
    }

    if (MERGED_OPTIONS.addDefaultBundle ?? true) {
      this.bundler.addBundle([this.srcdir, 'index.ts'].join(sep), {
        target: 'node18',
        platform: 'node',
        format: MERGED_OPTIONS.esmSupportConfig ?? true ? 'esm' : 'cjs',
        sourcemap: true,
        watchTask: true,
      });
    }

    if (MERGED_OPTIONS.sampleCode ?? true) {
      new SampleCode(this);
    }
  }
}

class SampleCode extends Component {
  constructor(project: TypeScriptProject) {
    super(project);
    const INDEX_SRC_CODE = [
      "import { Hello } from './hello.js';",
      '',
      'console.log(await new Hello().sayHello(2000));',
    ].join('\n');
    const HELLO_SRC_CODE = [
      "import { setTimeout } from 'timers/promises';",
      'export class Hello {',
      '  public async sayHello(delay: number = 100): Promise<string> {',
      '    await setTimeout(delay);',
      "    return 'hello, world!';",
      '  }',
      '}',
    ].join('\n');

    const TEST_CODE = [
      "import { Hello } from '../src/hello.js';",
      '',
      "test('hello', async () => {",
      '  const hello = new Hello();',
      "  expect(await hello.sayHello()).toBe('hello, world!');",
      '});',
    ].join('\n');

    new SampleDir(project, project.srcdir, {
      files: {
        'index.ts': INDEX_SRC_CODE,
        'hello.ts': HELLO_SRC_CODE,
      },
    });

    if (project.jest) {
      new SampleDir(project, project.testdir, {
        files: {
          'hello.test.ts': TEST_CODE,
        },
      });
    }
  }
}
