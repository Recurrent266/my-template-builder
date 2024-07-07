"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KFinTechNestJSAppProject = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.
const path = require("node:path");
const projen_1 = require("projen");
const util_1 = require("projen/lib/util");
const kfintech_typescript_app_project_1 = require("./kfintech-typescript-app-project");
const replace_placeholders_1 = require("./utils/replace-placeholders");
/**
 * Create a [NestJS](https://docs.nestjs.com) TypeScript project
 * @pjid kfintech-nestjs-app
 */
class KFinTechNestJSAppProject extends kfintech_typescript_app_project_1.KFinTechTypeScriptAppProject {
    constructor(options) {
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
                updateSnapshot: projen_1.javascript.UpdateSnapshot.NEVER,
            },
            tsJestOptions: {
                transformPattern: '^.+\\.m?[tj]sx?$',
                transformOptions: {
                    useESM: false,
                },
            },
            //option default values
            projectName: 'hello',
        };
        const MERGED_OPTIONS = (0, util_1.deepMerge)([DEFAULT_OPTIONS, options], true);
        super({ ...MERGED_OPTIONS, sampleCode: false });
        new NestjsSampleCode(this, MERGED_OPTIONS);
        //Add Docker file
        const SAMPLE_BASE_PATH = [__dirname, '..', 'samples'];
        new projen_1.SampleFile(this, 'Dockerfile', {
            sourcePath: path.join(...SAMPLE_BASE_PATH, 'Dockerfile'),
        });
        //Add .env file
        new projen_1.SampleFile(this, '.env', {
            sourcePath: path.join(...SAMPLE_BASE_PATH, '.env'),
        });
        // Nestjs dependencies
        this.addDeps('@nestjs/typeorm@^10.0.2', 'kfin.common.libs.core@' +
            'file:../../libs/core/core-lib/dist/kfin.common.libs.core-0.0.1.tgz', '@nestjs/common@^10.3.2', '@nestjs/core@^10.3.2', '@nestjs/platform-express@^10.3.2', '@nestjs/testing@^10.0.0', '@nestjs/swagger@^7.3.1', '@nestjs/config@^3.2.2', 'reflect-metadata@^0.2.1', 'rxjs@^7.8.1', '@nestjs/testing@^10.0.0', 'helmet@^7.1.0', '@nestjs/swagger@^7.3.1', 'nest-winston@^1.10.0', 'nestjs-otel@^6.1.1', '@nestjs/jwt@^10.2.0');
        //Dev dependencies
        this.addDevDeps('@tsconfig/node18', '@tsconfig/strictest', '@nestjs/cli@^10.3.1', '@nestjs/schematics@^10.1.0', '@types/express@^4.17.21', '@types/supertest@^6.0.2', 'supertest@^6.3.3', 'source-map-support@^0.5.21', 'ts-loader@^9.4.3', 'tsconfig-paths@^4.2.0');
        const SERVICE_NAME = (0, replace_placeholders_1.getServiceName)(options.outdir ? options.outdir : '');
        this.compileTask.reset('nest build');
        if (this.eslint) {
            this.addTask('format').spawn(this.eslint.eslintTask);
        }
        this.addTask('start').exec('nest start');
        this.addTask('start:dev').exec('nest start --watch');
        this.addTask('start:debug').exec('nest start --debug --watch');
        this.addTask('start:prod').exec('node dist/main');
        this.addTask('test:e2e').exec('jest --config ./test/jest-e2e.json');
        this.addTask('docker:build').exec(`docker buildx build -t ${SERVICE_NAME} . `);
        this.addTask('docker:run').exec(`docker run --rm -it -p 3000:3000 ${SERVICE_NAME}`);
        this.addTask('docker:all').exec('npm run docker:build && npm run docker:run');
        this.addTask('core:install').exec('npm run core:build; rm -rf ./lib; ' +
            'mkdir ./lib; cp ../../libs/core/core-lib/dist/*.tgz ./lib; ' +
            'npm i ./lib/kfin.common.libs.core-0.0.1.tgz --force');
        this.addTask('core:build').exec('cd ../../libs/core/core-lib; npm i; npm run dist');
    }
}
exports.KFinTechNestJSAppProject = KFinTechNestJSAppProject;
_a = JSII_RTTI_SYMBOL_1;
KFinTechNestJSAppProject[_a] = { fqn: "@kfintech/kfintech-projen-projects.KFinTechNestJSAppProject", version: "0.0.0" };
class NestjsSampleCode extends projen_1.Component {
    constructor(project, options) {
        super(project);
        const PROJECT_NAME = options.projectName;
        const SAMPLE_BASE_PATH = [__dirname, '..', 'samples', 'target'];
        (0, replace_placeholders_1.copyFilesAndFolders)(path.join(__dirname, '..', 'samples', 'kfintech-nestjs-app'), path.join(...SAMPLE_BASE_PATH), PROJECT_NAME);
        new projen_1.SampleDir(project, project.srcdir, {
            sourceDir: path.join(...SAMPLE_BASE_PATH, 'src'),
        });
        new projen_1.SampleDir(project, project.testdir, {
            sourceDir: path.join(...SAMPLE_BASE_PATH, 'test'),
        });
        if (options.lib ?? false) {
            new projen_1.SampleDir(project, project.libdir, {
                sourceDir: path.join(...SAMPLE_BASE_PATH, 'libs'),
            });
        }
        if (options.contract ?? false) {
            project
                .addTask('test:contract')
                .exec('jest --config ./test/jest-contract.json');
            project.addDeps('pactum@^3.7.0', 'pactum-flow-plugin@^0.1.4');
            new projen_1.SampleDir(project, path.join(project.testdir, PROJECT_NAME, 'contract'), {
                sourceDir: path.join(...SAMPLE_BASE_PATH, 'extra', 'contract'),
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ZpbnRlY2gtbmVzdGpzLWFwcC1wcm9qZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2tmaW50ZWNoLW5lc3Rqcy1hcHAtcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFzRDtBQUN0RCw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFLHlEQUF5RDtBQUN6RCxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUNyRSxxQ0FBcUM7QUFFckMsa0NBQWtDO0FBQ2xDLG1DQUFzRTtBQUV0RSwwQ0FBNEM7QUFDNUMsdUZBRzJDO0FBQzNDLHVFQUdzQztBQTZCdEM7OztHQUdHO0FBRUgsTUFBYSx3QkFBeUIsU0FBUSw4REFBNEI7SUFDeEUsWUFBWSxPQUF3QztRQUNsRCxNQUFNLGVBQWUsR0FBRztZQUN0QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxRQUFRLEVBQUU7Z0JBQ1IsZUFBZSxFQUFFO29CQUNmLE1BQU0sRUFBRSxRQUFRO29CQUNoQixvQkFBb0I7b0JBQ3BCLGFBQWEsRUFBRSxJQUFJO29CQUNuQixXQUFXLEVBQUUsSUFBSTtvQkFDakIscUJBQXFCLEVBQUUsSUFBSTtvQkFDM0Isc0JBQXNCLEVBQUUsSUFBSTtvQkFDNUIsNEJBQTRCLEVBQUUsSUFBSTtvQkFDbEMsU0FBUyxFQUFFLElBQUk7b0JBQ2YsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE1BQU0sRUFBRSxTQUFTO29CQUNqQixnQ0FBZ0MsRUFBRSxTQUFTO29CQUMzQyxnQkFBZ0IsRUFBRSxTQUFTO29CQUMzQixNQUFNLEVBQUUsU0FBUztvQkFDakIsMEJBQTBCLEVBQUUsU0FBUztpQkFDdEM7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxlQUFlLEVBQUU7b0JBQ2YsT0FB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QUNYLE9BQU8sRUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBc0IsRUFBRSxVQUFVLENBQUMsRUFDOUQ7Z0JBQ0UsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO2FBQy9ELENBQ0YsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDCqSAyMDI0IEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuXG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLiBUaGlzIEFXUyBDb250ZW50IGlzIHByb3ZpZGVkIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mXG4vLyB0aGUgQVdTIEN1c3RvbWVyIEFncmVlbWVudCBhdmFpbGFibGUgYXQgPGh0dHA6Ly9hd3MuYW1hem9uLmNvbS9hZ3JlZW1lbnQ+XG4vLyBvciBvdGhlciB3cml0dGVuIGFncmVlbWVudCBiZXR3ZWVuIEN1c3RvbWVyIGFuZCBlaXRoZXJcbi8vIEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgQW1hem9uIFdlYiBTZXJ2aWNlIEVNRUEgU0FSTCBvciBib3RoLlxuLy8gQ29weXJpZ2h0IDIwMjQgQW1hem9uLmNvbSBhbmQgaXRzIGFmZmlsaWF0ZXM7IGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBUaGlzIGZpbGUgaXMgQW1hem9uIFdlYiBTZXJ2aWNlcyBDb250ZW50IGFuZCBtYXkgbm90IGJlIGR1cGxpY2F0ZWRcbi8vIG9yIGRpc3RyaWJ1dGVkIHdpdGhvdXQgcGVybWlzc2lvbi5cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgamF2YXNjcmlwdCwgU2FtcGxlRmlsZSwgU2FtcGxlRGlyLCBDb21wb25lbnQgfSBmcm9tICdwcm9qZW4nO1xuaW1wb3J0IHsgVHlwZVNjcmlwdFByb2plY3QgfSBmcm9tICdwcm9qZW4vbGliL3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAncHJvamVuL2xpYi91dGlsJztcbmltcG9ydCB7XG4gIEtGaW5UZWNoVHlwZVNjcmlwdEFwcFByb2plY3QsXG4gIEtGaW5UZWNoVHlwZVNjcmlwdEFwcFByb2plY3RPcHRpb25zLFxufSBmcm9tICcuL2tmaW50ZWNoLXR5cGVzY3JpcHQtYXBwLXByb2plY3QnO1xuaW1wb3J0IHtcbiAgY29weUZpbGVzQW5kRm9sZGVycyxcbiAgZ2V0U2VydmljZU5hbWUsXG59IGZyb20gJy4vdXRpbHMvcmVwbGFjZS1wbGFjZWhvbGRlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEtGaW5UZWNoTmVzdEpTQXBwUHJvamVjdE9wdGlvbnNcbiAgZXh0ZW5kcyBLRmluVGVjaFR5cGVTY3JpcHRBcHBQcm9qZWN0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBOYW1lIHRvIGRpZmZlcmVudCBmaWxlcyBsaWtlIGNvbnRyb2xsZXIsIHNlcnZpY2UsIG1vZHVsZS5cbiAgICpcbiAgICogQGRlZmF1bHQgaGVsbG9cbiAgICpcbiAgICovXG4gIHJlYWRvbmx5IHByb2plY3ROYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBsaWJyYXJ5IHRvIE5lc3RKUyBwcm9qZWN0LlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqXG4gICAqL1xuICByZWFkb25seSBsaWI/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBZGQgcHJvdmlkZXIgcGFydCBvZiBjb250cmFjdCB0ZXN0aW5nIHRvIE5lc3RKUyBwcm9qZWN0LlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqXG4gICAqL1xuICByZWFkb25seSBjb250cmFjdD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgW05lc3RKU10oaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20pIFR5cGVTY3JpcHQgcHJvamVjdFxuICogQHBqaWQga2ZpbnRlY2gtbmVzdGpzLWFwcFxuICovXG5cbmV4cG9ydCBjbGFzcyBLRmluVGVjaE5lc3RKU0FwcFByb2plY3QgZXh0ZW5kcyBLRmluVGVjaFR5cGVTY3JpcHRBcHBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9uczogS0ZpblRlY2hOZXN0SlNBcHBQcm9qZWN0T3B0aW9ucykge1xuICAgIGNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICAgIGFkZERlZmF1bHRCdW5kbGU6IGZhbHNlLFxuICAgICAgZXNtU3VwcG9ydENvbmZpZzogZmFsc2UsXG4gICAgICBjb21taXRHZW5lcmF0ZWQ6IGZhbHNlLFxuICAgICAgcmVsZWFzZTogZmFsc2UsXG4gICAgICB0c2NvbmZpZzoge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBtb2R1bGU6ICdub2RlMTYnLFxuICAgICAgICAgIC8vIE5lZWRlZCBmb3IgbmVzdGpzXG4gICAgICAgICAgbm9JbXBsaWNpdEFueTogdHJ1ZSxcbiAgICAgICAgICBkZWNsYXJhdGlvbjogdHJ1ZSxcbiAgICAgICAgICBlbWl0RGVjb3JhdG9yTWV0YWRhdGE6IHRydWUsXG4gICAgICAgICAgZXhwZXJpbWVudGFsRGVjb3JhdG9yczogdHJ1ZSxcbiAgICAgICAgICBhbGxvd1N5bnRoZXRpY0RlZmF1bHRJbXBvcnRzOiB0cnVlLFxuICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZSxcbiAgICAgICAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgICAgICAgIGJhc2VVcmw6ICcuLycsXG4gICAgICAgICAgdGFyZ2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgZm9yY2VDb25zaXN0ZW50Q2FzaW5nSW5GaWxlTmFtZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdHJpY3ROdWxsQ2hlY2tzOiB1bmRlZmluZWQsXG4gICAgICAgICAgbm9FbWl0OiB1bmRlZmluZWQsXG4gICAgICAgICAgbm9GYWxsdGhyb3VnaENhc2VzSW5Td2l0Y2g6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0c2NvbmZpZ0Rldjoge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBiYXNlVXJsOiAnLi8nLFxuICAgICAgICAgIHRhcmdldDogJ2VzMjAyMicsXG4gICAgICAgICAgZXhwZXJpbWVudGFsRGVjb3JhdG9yczogdW5kZWZpbmVkLFxuICAgICAgICAgIGVtaXREZWNvcmF0b3JNZXRhZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICAgIGFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICBvdXREaXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICBza2lwTGliQ2hlY2s6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdHJpY3ROdWxsQ2hlY2tzOiB1bmRlZmluZWQsXG4gICAgICAgICAgbm9JbXBsaWNpdEFueTogdW5kZWZpbmVkLFxuICAgICAgICAgIGZvcmNlQ29uc2lzdGVudENhc2luZ0luRmlsZU5hbWVzOiB1bmRlZmluZWQsXG4gICAgICAgICAgbm9GYWxsdGhyb3VnaENhc2VzSW5Td2l0Y2g6IHVuZGVmaW5lZCxcbiAgICAgICAgICBub0VtaXQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgamVzdE9wdGlvbnM6IHtcbiAgICAgICAgamVzdENvbmZpZzoge1xuICAgICAgICAgIG1vZHVsZUZpbGVFeHRlbnNpb25zOiBbJ2pzJywgJ2pzb24nLCAndHMnXSxcbiAgICAgICAgICByb290RGlyOiAnLicsXG4gICAgICAgICAgdGVzdE1hdGNoOiBbJzxyb290RGlyPi8odGVzdHxzcmMpLyoqLyooKilAKC4pQChzcGVjfHRlc3QpLnRzPyh4KSddLFxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVTbmFwc2hvdDogamF2YXNjcmlwdC5VcGRhdGVTbmFwc2hvdC5ORVZFUixcbiAgICAgIH0sXG5cbiAgICAgIHRzSmVzdE9wdGlvbnM6IHtcbiAgICAgICAgdHJhbnNmb3JtUGF0dGVybjogJ14uK1xcXFwubT9bdGpdc3g/JCcsXG4gICAgICAgIHRyYW5zZm9ybU9wdGlvbnM6IHtcbiAgICAgICAgICB1c2VFU006IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcblxuICAgICAgLy9vcHRpb24gZGVmYXVsdCB2YWx1ZXNcbiAgICAgIHByb2plY3ROYW1lOiAnaGVsbG8nLFxuICAgIH0gc2F0aXNmaWVzIFBhcnRpYWw8S0ZpblRlY2hOZXN0SlNBcHBQcm9qZWN0T3B0aW9ucz47XG5cbiAgICBjb25zdCBNRVJHRURfT1BUSU9OUyA9IGRlZXBNZXJnZShcbiAgICAgIFtERUZBVUxUX09QVElPTlMsIG9wdGlvbnNdLFxuICAgICAgdHJ1ZSxcbiAgICApIGFzIEtGaW5UZWNoTmVzdEpTQXBwUHJvamVjdE9wdGlvbnM7XG5cbiAgICBzdXBlcih7IC4uLk1FUkdFRF9PUFRJT05TLCBzYW1wbGVDb2RlOiBmYWxzZSB9KTtcblxuICAgIG5ldyBOZXN0anNTYW1wbGVDb2RlKHRoaXMsIE1FUkdFRF9PUFRJT05TKTtcblxuICAgIC8vQWRkIERvY2tlciBmaWxlXG4gICAgY29uc3QgU0FNUExFX0JBU0VfUEFUSCA9IFtfX2Rpcm5hbWUsICcuLicsICdzYW1wbGVzJ107XG4gICAgbmV3IFNhbXBsZUZpbGUodGhpcywgJ0RvY2tlcmZpbGUnLCB7XG4gICAgICBzb3VyY2VQYXRoOiBwYXRoLmpvaW4oLi4uU0FNUExFX0JBU0VfUEFUSCwgJ0RvY2tlcmZpbGUnKSxcbiAgICB9KTtcblxuICAgIC8vQWRkIC5lbnYgZmlsZVxuICAgIG5ldyBTYW1wbGVGaWxlKHRoaXMsICcuZW52Jywge1xuICAgICAgc291cmNlUGF0aDogcGF0aC5qb2luKC4uLlNBTVBMRV9CQVNFX1BBVEgsICcuZW52JyksXG4gICAgfSk7XG5cbiAgICAvLyBOZXN0anMgZGVwZW5kZW5jaWVzXG4gICAgdGhpcy5hZGREZXBzKFxuICAgICAgJ0BuZXN0anMvdHlwZW9ybUBeMTAuMC4yJyxcbiAgICAgICdrZmluLmNvbW1vbi5saWJzLmNvcmVAJyArXG4gICAgICAgICdmaWxlOi4uLy4uL2xpYnMvY29yZS9jb3JlLWxpYi9kaXN0L2tmaW4uY29tbW9uLmxpYnMuY29yZS0wLjAuMS50Z3onLFxuICAgICAgJ0BuZXN0anMvY29tbW9uQF4xMC4zLjInLFxuICAgICAgJ0BuZXN0anMvY29yZUBeMTAuMy4yJyxcbiAgICAgICdAbmVzdGpzL3BsYXRmb3JtLWV4cHJlc3NAXjEwLjMuMicsXG4gICAgICAnQG5lc3Rqcy90ZXN0aW5nQF4xMC4wLjAnLFxuICAgICAgJ0BuZXN0anMvc3dhZ2dlckBeNy4zLjEnLFxuICAgICAgJ0BuZXN0anMvY29uZmlnQF4zLjIuMicsXG4gICAgICAncmVmbGVjdC1tZXRhZGF0YUBeMC4yLjEnLFxuICAgICAgJ3J4anNAXjcuOC4xJyxcbiAgICAgICdAbmVzdGpzL3Rlc3RpbmdAXjEwLjAuMCcsXG4gICAgICAnaGVsbWV0QF43LjEuMCcsXG4gICAgICAnQG5lc3Rqcy9zd2FnZ2VyQF43LjMuMScsXG4gICAgICAnbmVzdC13aW5zdG9uQF4xLjEwLjAnLFxuICAgICAgJ25lc3Rqcy1vdGVsQF42LjEuMScsXG4gICAgICAnQG5lc3Rqcy9qd3RAXjEwLjIuMCcsXG4gICAgKTtcblxuICAgIC8vRGV2IGRlcGVuZGVuY2llc1xuICAgIHRoaXMuYWRkRGV2RGVwcyhcbiAgICAgICdAdHNjb25maWcvbm9kZTE4JyxcbiAgICAgICdAdHNjb25maWcvc3RyaWN0ZXN0JyxcbiAgICAgICdAbmVzdGpzL2NsaUBeMTAuMy4xJyxcbiAgICAgICdAbmVzdGpzL3NjaGVtYXRpY3NAXjEwLjEuMCcsXG4gICAgICAnQHR5cGVzL2V4cHJlc3NAXjQuMTcuMjEnLFxuICAgICAgJ0B0eXBlcy9zdXBlcnRlc3RAXjYuMC4yJyxcbiAgICAgICdzdXBlcnRlc3RAXjYuMy4zJyxcbiAgICAgICdzb3VyY2UtbWFwLXN1cHBvcnRAXjAuNS4yMScsXG4gICAgICAndHMtbG9hZGVyQF45LjQuMycsXG4gICAgICAndHNjb25maWctcGF0aHNAXjQuMi4wJyxcbiAgICApO1xuXG4gICAgY29uc3QgU0VSVklDRV9OQU1FID0gZ2V0U2VydmljZU5hbWUob3B0aW9ucy5vdXRkaXIgPyBvcHRpb25zLm91dGRpciA6ICcnKTtcbiAgICB0aGlzLmNvbXBpbGVUYXNrLnJlc2V0KCduZXN0IGJ1aWxkJyk7XG4gICAgaWYgKHRoaXMuZXNsaW50KSB7XG4gICAgICB0aGlzLmFkZFRhc2soJ2Zvcm1hdCcpLnNwYXduKHRoaXMuZXNsaW50LmVzbGludFRhc2spO1xuICAgIH1cbiAgICB0aGlzLmFkZFRhc2soJ3N0YXJ0JykuZXhlYygnbmVzdCBzdGFydCcpO1xuICAgIHRoaXMuYWRkVGFzaygnc3RhcnQ6ZGV2JykuZXhlYygnbmVzdCBzdGFydCAtLXdhdGNoJyk7XG4gICAgdGhpcy5hZGRUYXNrKCdzdGFydDpkZWJ1ZycpLmV4ZWMoJ25lc3Qgc3RhcnQgLS1kZWJ1ZyAtLXdhdGNoJyk7XG4gICAgdGhpcy5hZGRUYXNrKCdzdGFydDpwcm9kJykuZXhlYygnbm9kZSBkaXN0L21haW4nKTtcbiAgICB0aGlzLmFkZFRhc2soJ3Rlc3Q6ZTJlJykuZXhlYygnamVzdCAtLWNvbmZpZyAuL3Rlc3QvamVzdC1lMmUuanNvbicpO1xuICAgIHRoaXMuYWRkVGFzaygnZG9ja2VyOmJ1aWxkJykuZXhlYyhcbiAgICAgIGBkb2NrZXIgYnVpbGR4IGJ1aWxkIC10ICR7U0VSVklDRV9OQU1FfSAuIGAsXG4gICAgKTtcbiAgICB0aGlzLmFkZFRhc2soJ2RvY2tlcjpydW4nKS5leGVjKFxuICAgICAgYGRvY2tlciBydW4gLS1ybSAtaXQgLXAgMzAwMDozMDAwICR7U0VSVklDRV9OQU1FfWAsXG4gICAgKTtcbiAgICB0aGlzLmFkZFRhc2soJ2RvY2tlcjphbGwnKS5leGVjKFxuICAgICAgJ25wbSBydW4gZG9ja2VyOmJ1aWxkICYmIG5wbSBydW4gZG9ja2VyOnJ1bicsXG4gICAgKTtcbiAgICB0aGlzLmFkZFRhc2soJ2NvcmU6aW5zdGFsbCcpLmV4ZWMoXG4gICAgICAnbnBtIHJ1biBjb3JlOmJ1aWxkOyBybSAtcmYgLi9saWI7ICcgK1xuICAgICAgICAnbWtkaXIgLi9saWI7IGNwIC4uLy4uL2xpYnMvY29yZS9jb3JlLWxpYi9kaXN0LyoudGd6IC4vbGliOyAnICtcbiAgICAgICAgJ25wbSBpIC4vbGliL2tmaW4uY29tbW9uLmxpYnMuY29yZS0wLjAuMS50Z3ogLS1mb3JjZScsXG4gICAgKTtcbiAgICB0aGlzLmFkZFRhc2soJ2NvcmU6YnVpbGQnKS5leGVjKFxuICAgICAgJ2NkIC4uLy4uL2xpYnMvY29yZS9jb3JlLWxpYjsgbnBtIGk7IG5wbSBydW4gZGlzdCcsXG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBOZXN0anNTYW1wbGVDb2RlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvamVjdDogVHlwZVNjcmlwdFByb2plY3QsXG4gICAgb3B0aW9uczogS0ZpblRlY2hOZXN0SlNBcHBQcm9qZWN0T3B0aW9ucyxcbiAgKSB7XG4gICAgc3VwZXIocHJvamVjdCk7XG5cbiAgICBjb25zdCBQUk9KRUNUX05BTUUgPSBvcHRpb25zLnByb2plY3ROYW1lO1xuICAgIGNvbnN0IFNBTVBMRV9CQVNFX1BBVEggPSBbX19kaXJuYW1lLCAnLi4nLCAnc2FtcGxlcycsICd0YXJnZXQnXTtcbiAgICBjb3B5RmlsZXNBbmRGb2xkZXJzKFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NhbXBsZXMnLCAna2ZpbnRlY2gtbmVzdGpzLWFwcCcpLFxuICAgICAgcGF0aC5qb2luKC4uLlNBTVBMRV9CQVNFX1BBVEgpLFxuICAgICAgUFJPSkVDVF9OQU1FIGFzIHN0cmluZyxcbiAgICApO1xuXG4gICAgbmV3IFNhbXBsZURpcihwcm9qZWN0LCBwcm9qZWN0LnNyY2Rpciwge1xuICAgICAgc291cmNlRGlyOiBwYXRoLmpvaW4oLi4uU0FNUExFX0JBU0VfUEFUSCwgJ3NyYycpLFxuICAgIH0pO1xuICAgIG5ldyBTYW1wbGVEaXIocHJvamVjdCwgcHJvamVjdC50ZXN0ZGlyLCB7XG4gICAgICBzb3VyY2VEaXI6IHBhdGguam9pbiguLi5TQU1QTEVfQkFTRV9QQVRILCAndGVzdCcpLFxuICAgIH0pO1xuXG4gICAgaWYgKG9wdGlvbnMubGliID8/IGZhbHNlKSB7XG4gICAgICBuZXcgU2FtcGxlRGlyKHByb2plY3QsIHByb2plY3QubGliZGlyLCB7XG4gICAgICAgIHNvdXJjZURpcjogcGF0aC5qb2luKC4uLlNBTVBMRV9CQVNFX1BBVEgsICdsaWJzJyksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jb250cmFjdCA/PyBmYWxzZSkge1xuICAgICAgcHJvamVjdFxuICAgICAgICAuYWRkVGFzaygndGVzdDpjb250cmFjdCcpXG4gICAgICAgIC5leGVjKCdqZXN0IC0tY29uZmlnIC4vdGVzdC9qZXN0LWNvbnRyYWN0Lmpzb24nKTtcbiAgICAgIHByb2plY3QuYWRkRGVwcygncGFjdHVtQF4zLjcuMCcsICdwYWN0dW0tZmxvdy1wbHVnaW5AXjAuMS40Jyk7XG5cbiAgICAgIG5ldyBTYW1wbGVEaXIoXG4gICAgICAgIHByb2plY3QsXG4gICAgICAgIHBhdGguam9pbihwcm9qZWN0LnRlc3RkaXIsIFBST0pFQ1RfTkFNRSBhcyBzdHJpbmcsICdjb250cmFjdCcpLFxuICAgICAgICB7XG4gICAgICAgICAgc291cmNlRGlyOiBwYXRoLmpvaW4oLi4uU0FNUExFX0JBU0VfUEFUSCwgJ2V4dHJhJywgJ2NvbnRyYWN0JyksXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19