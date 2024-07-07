// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import * as path from 'node:path';
import { javascript, SampleFile, SampleDir, Component } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { deepMerge } from 'projen/lib/util';
import {
  KFinTechTypeScriptAppProject,
  KFinTechTypeScriptAppProjectOptions,
} from './kfintech-typescript-app-project';
import {
  copyFilesAndFolders,
  getServiceName,
} from './utils/replace-placeholders';

export interface KFinTechNestJSAppProjectOptions
  extends KFinTechTypeScriptAppProjectOptions {
  /**
   * Name to different files like controller, service, module.
   *
   * @default hello
   *
   */
  readonly projectName?: string;

  /**
   * Add a library to NestJS project.
   *
   * @default true
   *
   */
  readonly lib?: boolean;

  /**
   * Add provider part of contract testing to NestJS project.
   *
   * @default true
   *
   */
  readonly contract?: boolean;
}

/**
 * Create a [NestJS](https://docs.nestjs.com) TypeScript project
 * @pjid kfintech-nestjs-app
 */

export class KFinTechNestJSAppProject extends KFinTechTypeScriptAppProject {
  constructor(options: KFinTechNestJSAppProjectOptions) {
    const DEFAULT_OPTIONS = {
      addDefaultBundle: false,
      esmSupportConfig: false,
      commitGenerated: false,
      release: false,
      tsconfig: {
        compilerOptions: {
          module: 'node16',
          // Needed for nestjs
          noImplicitAny: true,
          declaration: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          allowSyntheticDefaultImports: true,
          sourceMap: true,
          outDir: './dist',
          baseUrl: './',
          target: undefined,
          forceConsistentCasingInFileNames: undefined,
          strictNullChecks: undefined,
          noEmit: undefined,
          noFallthroughCasesInSwitch: undefined,
        },
      },
      tsconfigDev: {
        compilerOptions: {
          baseUrl: './',
          target: 'es2022',
          experimentalDecorators: undefined,
          emitDecoratorMetadata: undefined,
          allowSyntheticDefaultImports: undefined,
          outDir: undefined,
          skipLibCheck: undefined,
          strictNullChecks: undefined,
          noImplicitAny: undefined,
          forceConsistentCasingInFileNames: undefined,
          noFallthroughCasesInSwitch: undefined,
          noEmit: true,
        },
      },
      jestOptions: {
        jestConfig: {
          moduleFileExtensions: ['js', 'json', 'ts'],
          rootDir: '.',
          testMatch: ['<rootDir>/(test|src)/**/*(*)@(.)@(spec|test).ts?(x)'],
        },
        updateSnapshot: javascript.UpdateSnapshot.NEVER,
      },

      tsJestOptions: {
        transformPattern: '^.+\\.m?[tj]sx?$',
        transformOptions: {
          useESM: false,
        },
      },

      //option default values
      projectName: 'hello',
    } satisfies Partial<KFinTechNestJSAppProjectOptions>;

    const MERGED_OPTIONS = deepMerge(
      [DEFAULT_OPTIONS, options],
      true,
    ) as KFinTechNestJSAppProjectOptions;

    super({ ...MERGED_OPTIONS, sampleCode: false });

    new NestjsSampleCode(this, MERGED_OPTIONS);

    //Add Docker file
    const SAMPLE_BASE_PATH = [__dirname, '..', 'samples'];
    new SampleFile(this, 'Dockerfile', {
      sourcePath: path.join(...SAMPLE_BASE_PATH, 'Dockerfile'),
    });

    //Add .env file
    new SampleFile(this, '.env', {
      sourcePath: path.join(...SAMPLE_BASE_PATH, '.env'),
    });

    // Nestjs dependencies
    this.addDeps(
      '@nestjs/typeorm@^10.0.2',
      'kfin.common.libs.core@' +
        'file:../../libs/core/core-lib/dist/kfin.common.libs.core-0.0.1.tgz',
      '@nestjs/common@^10.3.2',
      '@nestjs/core@^10.3.2',
      '@nestjs/platform-express@^10.3.2',
      '@nestjs/testing@^10.0.0',
      '@nestjs/swagger@^7.3.1',
      '@nestjs/config@^3.2.2',
      'reflect-metadata@^0.2.1',
      'rxjs@^7.8.1',
      '@nestjs/testing@^10.0.0',
      'helmet@^7.1.0',
      '@nestjs/swagger@^7.3.1',
      'nest-winston@^1.10.0',
      'nestjs-otel@^6.1.1',
      '@nestjs/jwt@^10.2.0',
    );

    //Dev dependencies
    this.addDevDeps(
      '@tsconfig/node18',
      '@tsconfig/strictest',
      '@nestjs/cli@^10.3.1',
      '@nestjs/schematics@^10.1.0',
      '@types/express@^4.17.21',
      '@types/supertest@^6.0.2',
      'supertest@^6.3.3',
      'source-map-support@^0.5.21',
      'ts-loader@^9.4.3',
      'tsconfig-paths@^4.2.0',
    );

    const SERVICE_NAME = getServiceName(options.outdir ? options.outdir : '');
    this.compileTask.reset('nest build');
    if (this.eslint) {
      this.addTask('format').spawn(this.eslint.eslintTask);
    }
    this.addTask('start').exec('nest start');
    this.addTask('start:dev').exec('nest start --watch');
    this.addTask('start:debug').exec('nest start --debug --watch');
    this.addTask('start:prod').exec('node dist/main');
    this.addTask('test:e2e').exec('jest --config ./test/jest-e2e.json');
    this.addTask('docker:build').exec(
      `docker buildx build -t ${SERVICE_NAME} . `,
    );
    this.addTask('docker:run').exec(
      `docker run --rm -it -p 3000:3000 ${SERVICE_NAME}`,
    );
    this.addTask('docker:all').exec(
      'npm run docker:build && npm run docker:run',
    );
    this.addTask('core:install').exec(
      'npm run core:build; rm -rf ./lib; ' +
        'mkdir ./lib; cp ../../libs/core/core-lib/dist/*.tgz ./lib; ' +
        'npm i ./lib/kfin.common.libs.core-0.0.1.tgz --force',
    );
    this.addTask('core:build').exec(
      'cd ../../libs/core/core-lib; npm i; npm run dist',
    );
  }
}

class NestjsSampleCode extends Component {
  constructor(
    project: TypeScriptProject,
    options: KFinTechNestJSAppProjectOptions,
  ) {
    super(project);

    const PROJECT_NAME = options.projectName;
    const SAMPLE_BASE_PATH = [__dirname, '..', 'samples', 'target'];
    copyFilesAndFolders(
      path.join(__dirname, '..', 'samples', 'kfintech-nestjs-app'),
      path.join(...SAMPLE_BASE_PATH),
      PROJECT_NAME as string,
    );

    new SampleDir(project, project.srcdir, {
      sourceDir: path.join(...SAMPLE_BASE_PATH, 'src'),
    });
    new SampleDir(project, project.testdir, {
      sourceDir: path.join(...SAMPLE_BASE_PATH, 'test'),
    });

    if (options.lib ?? false) {
      new SampleDir(project, project.libdir, {
        sourceDir: path.join(...SAMPLE_BASE_PATH, 'libs'),
      });
    }

    if (options.contract ?? false) {
      project
        .addTask('test:contract')
        .exec('jest --config ./test/jest-contract.json');
      project.addDeps('pactum@^3.7.0', 'pactum-flow-plugin@^0.1.4');

      new SampleDir(
        project,
        path.join(project.testdir, PROJECT_NAME as string, 'contract'),
        {
          sourceDir: path.join(...SAMPLE_BASE_PATH, 'extra', 'contract'),
        },
      );
    }
  }
}
