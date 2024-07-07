"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KFinTechTypeScriptAppProject = exports.KFinTechTSConfigBase = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.
const path_1 = require("path");
const projen_1 = require("projen");
const javascript_1 = require("projen/lib/javascript");
const typescript_1 = require("projen/lib/typescript");
const util_1 = require("projen/lib/util");
const eslint_config_1 = require("./constants/eslint-config");
const tsconfig_options_1 = require("./constants/tsconfig-options");
var KFinTechTSConfigBase;
(function (KFinTechTSConfigBase) {
    KFinTechTSConfigBase["NODE_VERSION"] = "node18";
})(KFinTechTSConfigBase || (exports.KFinTechTSConfigBase = KFinTechTSConfigBase = {}));
/**
 * Create a [TypeScriptAppProject]
 * @pjid kfintech-typescript-app
 */
class KFinTechTypeScriptAppProject extends typescript_1.TypeScriptAppProject {
    constructor(options) {
        const DEFAULT_OPTIONS = {
            eslint: true,
            packageManager: javascript_1.NodePackageManager.NPM,
            prettier: true,
            projenrcTs: true,
            projenVersion: '>=0.79.23',
            nodeVersion: `v${process.versions.node}`,
            vscode: true,
            tsconfig: {
                compilerOptions: {
                    ...tsconfig_options_1.TSCONFIG_OPTIONS,
                    ...tsconfig_options_1.TSCONFIG_OPTIONS_STRICT,
                    moduleResolution: javascript_1.TypeScriptModuleResolution.NODE16,
                    noEmit: options.addDefaultBundle ?? true,
                },
                extends: javascript_1.TypescriptConfigExtends.fromPaths([
                    `@tsconfig/${options.tsconfigBase ?? KFinTechTSConfigBase.NODE_VERSION}/tsconfig.json`,
                ]),
            },
            github: false,
            commitGenerated: false,
            release: false,
            tsconfigDev: {
                compilerOptions: {
                    ...tsconfig_options_1.TSCONFIG_OPTIONS,
                    moduleResolution: javascript_1.TypeScriptModuleResolution.NODE16,
                    noEmit: true,
                },
                extends: javascript_1.TypescriptConfigExtends.fromPaths([
                    `@tsconfig/${options.tsconfigBaseDev ?? KFinTechTSConfigBase.NODE_VERSION}/tsconfig.json`,
                ]),
            },
            jest: true,
            jestOptions: {
                updateSnapshot: javascript_1.UpdateSnapshot.NEVER,
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
        };
        const MERGED_OPTIONS = (0, util_1.deepMerge)([DEFAULT_OPTIONS, options], true);
        super({ ...MERGED_OPTIONS, sampleCode: false });
        this.addDevDeps(...new Set([
            `@tsconfig/${MERGED_OPTIONS.tsconfigBase ?? KFinTechTSConfigBase.NODE_VERSION}`,
            `@tsconfig/${MERGED_OPTIONS.tsconfigBaseDev ?? KFinTechTSConfigBase.NODE_VERSION}`,
        ]));
        // Add the ESLint configuration
        this.eslint?.addRules(eslint_config_1.eslintRules);
        this.eslint?.addOverride(eslint_config_1.eslintOverrides);
        this.eslint?.addPlugins('@typescript-eslint', 'import', 'prettier');
        this.eslint?.addExtends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:import/typescript', 'plugin:prettier/recommended');
        this.prettier?.addOverride({
            files: '*',
            options: {
                singleQuote: true,
                trailingComma: 'all',
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
            new projen_1.TextFile(this, '.nvmrc', {
                lines: [MERGED_OPTIONS.nodeVersion],
            });
        }
        if (MERGED_OPTIONS.esmSupportConfig) {
            this.package.addField('type', 'module');
            [this.tsconfig, this.tsconfigDev].forEach((tsconfig) => tsconfig &&
                tsconfig.file.patch(projen_1.JsonPatch.add('/ts-node', {
                    esm: true,
                    preferTsExts: false,
                    experimentalSpecifierResolution: 'node',
                })));
        }
        else {
            [this.tsconfig, this.tsconfigDev].forEach((tsconfig) => tsconfig &&
                tsconfig.file.patch(projen_1.JsonPatch.add('/ts-node', {
                    compilerOptions: {
                        module: 'commonjs',
                    },
                    preferTsExts: true,
                    experimentalSpecifierResolution: 'node',
                })));
        }
        if (MERGED_OPTIONS.jest && this.jest) {
            /* eslint-disable */
            this.jest.config.globals = undefined;
            this.jest.config.moduleNameMapper = {
                '^(\\.{1,2}/.*)\\.m?js$': '$1',
            };
            /* eslint-disable */
            if (MERGED_OPTIONS.esmSupportConfig ?? true) {
                this.testTask.env('NODE_OPTIONS', '$(echo $NODE_OPTIONS --experimental-vm-modules)');
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
            EXTESNIONS.addRecommendations('dbaeumer.vscode-eslint', 'Orta.vscode-jest');
        }
        if (MERGED_OPTIONS.addDefaultBundle ?? true) {
            this.bundler.addBundle([this.srcdir, 'index.ts'].join(path_1.sep), {
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
exports.KFinTechTypeScriptAppProject = KFinTechTypeScriptAppProject;
_a = JSII_RTTI_SYMBOL_1;
KFinTechTypeScriptAppProject[_a] = { fqn: "template_builder.KFinTechTypeScriptAppProject", version: "0.0.0" };
class SampleCode extends projen_1.Component {
    constructor(project) {
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
        new projen_1.SampleDir(project, project.srcdir, {
            files: {
                'index.ts': INDEX_SRC_CODE,
                'hello.ts': HELLO_SRC_CODE,
            },
        });
        if (project.jest) {
            new projen_1.SampleDir(project, project.testdir, {
                files: {
                    'hello.test.ts': TEST_CODE,
                },
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ZpbnRlY2gtdHlwZXNjcmlwdC1hcHAtcHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9rZmludGVjaC10eXBlc2NyaXB0LWFwcC1wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQXNEO0FBQ3RELDRFQUE0RTtBQUM1RSw0RUFBNEU7QUFDNUUseURBQXlEO0FBQ3pELHFFQUFxRTtBQUNyRSxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFDQUFxQztBQUVyQywrQkFBMkI7QUFDM0IsbUNBQW1FO0FBQ25FLHNEQU0rQjtBQUMvQixzREFJK0I7QUFDL0IsMENBQTRDO0FBQzVDLDZEQUF5RTtBQUN6RSxtRUFHc0M7QUFFdEMsSUFBWSxvQkFFWDtBQUZELFdBQVksb0JBQW9CO0lBQzlCLCtDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFGVyxvQkFBb0Isb0NBQXBCLG9CQUFvQixRQUUvQjtBQWVEOzs7R0FHRztBQUVILE1BQWEsNEJBQTZCLFNBQVEsaUNBQW9CO0lBQ3BFLFlBQVksT0FBNEM7UUFDdEQsTUFBTSxlQUFlLEdBQUc7WUFDdEIsTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsK0JBQWtCLENBQUMsR0FBRztZQUN0QyxRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLFdBQVcsRUFBRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRTtvQkFDZixHQUFHLG1DQUFnQjtvQkFDbkIsR0FBRywwQ0FBdUI7b0JBQzFCLGdCQUFnQixFQUFFLHVDQUEwQixDQUFDLE1BQU07b0JBQ25ELE1BQU0sRUFBRSxPQUFPLENBQUMsZ0JBQWdCLElBQUksSUFBSTtpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFLG9DQUF1QixDQUFDLFNBQVMs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LEVBQUU7WUFDRiw2QkFBNkI7WUFDN0IsOEJBQThCO1lBQzlCLHlEQUF5RDtZQUN6RCxLQUFLO1NBQ04sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLGtCQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDckMsS0FBSyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixVQUFVLEVBQUUsY0FBYzthQUMzQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLElBQUksa0JBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsS0FBSyxFQUFFO29CQUNMLGVBQWUsRUFBRSxTQUFTO2lCQUMzQjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDCqSAyMDI0IEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuXG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLiBUaGlzIEFXUyBDb250ZW50IGlzIHByb3ZpZGVkIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mXG4vLyB0aGUgQVdTIEN1c3RvbWVyIEFncmVlbWVudCBhdmFpbGFibGUgYXQgPGh0dHA6Ly9hd3MuYW1hem9uLmNvbS9hZ3JlZW1lbnQ+XG4vLyBvciBvdGhlciB3cml0dGVuIGFncmVlbWVudCBiZXR3ZWVuIEN1c3RvbWVyIGFuZCBlaXRoZXJcbi8vIEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgQW1hem9uIFdlYiBTZXJ2aWNlIEVNRUEgU0FSTCBvciBib3RoLlxuLy8gQ29weXJpZ2h0IDIwMjQgQW1hem9uLmNvbSBhbmQgaXRzIGFmZmlsaWF0ZXM7IGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBUaGlzIGZpbGUgaXMgQW1hem9uIFdlYiBTZXJ2aWNlcyBDb250ZW50IGFuZCBtYXkgbm90IGJlIGR1cGxpY2F0ZWRcbi8vIG9yIGRpc3RyaWJ1dGVkIHdpdGhvdXQgcGVybWlzc2lvbi5cblxuaW1wb3J0IHsgc2VwIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBKc29uUGF0Y2gsIFRleHRGaWxlLCBDb21wb25lbnQsIFNhbXBsZURpciB9IGZyb20gJ3Byb2plbic7XG5pbXBvcnQge1xuICBOb2RlUGFja2FnZU1hbmFnZXIsXG4gIFRyYWlsaW5nQ29tbWEsXG4gIFR5cGVTY3JpcHRNb2R1bGVSZXNvbHV0aW9uLFxuICBUeXBlc2NyaXB0Q29uZmlnRXh0ZW5kcyxcbiAgVXBkYXRlU25hcHNob3QsXG59IGZyb20gJ3Byb2plbi9saWIvamF2YXNjcmlwdCc7XG5pbXBvcnQge1xuICBUeXBlU2NyaXB0QXBwUHJvamVjdCxcbiAgVHlwZVNjcmlwdFByb2plY3QsXG4gIFR5cGVTY3JpcHRQcm9qZWN0T3B0aW9ucyxcbn0gZnJvbSAncHJvamVuL2xpYi90eXBlc2NyaXB0JztcbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJ3Byb2plbi9saWIvdXRpbCc7XG5pbXBvcnQgeyBlc2xpbnRPdmVycmlkZXMsIGVzbGludFJ1bGVzIH0gZnJvbSAnLi9jb25zdGFudHMvZXNsaW50LWNvbmZpZyc7XG5pbXBvcnQge1xuICBUU0NPTkZJR19PUFRJT05TLFxuICBUU0NPTkZJR19PUFRJT05TX1NUUklDVCxcbn0gZnJvbSAnLi9jb25zdGFudHMvdHNjb25maWctb3B0aW9ucyc7XG5cbmV4cG9ydCBlbnVtIEtGaW5UZWNoVFNDb25maWdCYXNlIHtcbiAgTk9ERV9WRVJTSU9OID0gJ25vZGUxOCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS0ZpblRlY2hUeXBlU2NyaXB0QXBwUHJvamVjdE9wdGlvbnNcbiAgZXh0ZW5kcyBUeXBlU2NyaXB0UHJvamVjdE9wdGlvbnMge1xuICAvLyBidW5kbGUgZGlzdCB1c2luZyBlc2J1aWxkXG4gIHJlYWRvbmx5IGFkZERlZmF1bHRCdW5kbGU/OiBib29sZWFuO1xuICAvLyBlbmFibGUgRVNNXG4gIHJlYWRvbmx5IGVzbVN1cHBvcnRDb25maWc/OiBib29sZWFuO1xuICByZWFkb25seSBlc2xpbnRGaXhhYmxlQXNXYXJuPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbm9kZVZlcnNpb24/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRzY29uZmlnQmFzZT86IEtGaW5UZWNoVFNDb25maWdCYXNlO1xuICByZWFkb25seSB0c2NvbmZpZ0Jhc2VEZXY/OiBLRmluVGVjaFRTQ29uZmlnQmFzZTtcbiAgcmVhZG9ubHkgdHNjb25maWdCYXNlU3RyaWN0ZXN0PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBbVHlwZVNjcmlwdEFwcFByb2plY3RdXG4gKiBAcGppZCBrZmludGVjaC10eXBlc2NyaXB0LWFwcFxuICovXG5cbmV4cG9ydCBjbGFzcyBLRmluVGVjaFR5cGVTY3JpcHRBcHBQcm9qZWN0IGV4dGVuZHMgVHlwZVNjcmlwdEFwcFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBLRmluVGVjaFR5cGVTY3JpcHRBcHBQcm9qZWN0T3B0aW9ucykge1xuICAgIGNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICAgIGVzbGludDogdHJ1ZSxcbiAgICAgIHBhY2thZ2VNYW5hZ2VyOiBOb2RlUGFja2FnZU1hbmFnZXIuTlBNLFxuICAgICAgcHJldHRpZXI6IHRydWUsXG4gICAgICBwcm9qZW5yY1RzOiB0cnVlLFxuICAgICAgcHJvamVuVmVyc2lvbjogJz49MC43OS4yMycsXG4gICAgICBub2RlVmVyc2lvbjogYHYke3Byb2Nlc3MudmVyc2lvbnMubm9kZX1gLFxuICAgICAgdnNjb2RlOiB0cnVlLFxuICAgICAgdHNjb25maWc6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgLi4uVFNDT05GSUdfT1BUSU9OUyxcbiAgICAgICAgICAuLi5UU0NPTkZJR19PUFRJT05TX1NUUklDVCxcbiAgICAgICAgICBtb2R1bGVSZXNvbHV0aW9uOiBUeXBlU2NyaXB0TW9kdWxlUmVzb2x1dGlvbi5OT0RFMTYsXG4gICAgICAgICAgbm9FbWl0OiBvcHRpb25zLmFkZERlZmF1bHRCdW5kbGUgPz8gdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5kczogVHlwZXNjcmlwdENvbmZpZ0V4dGVuZHMuZnJvbVBhdGhzKFtcbiAgICAgICAgICBgQHRzY29uZmlnLyR7XG4gICAgICAgICAgICBvcHRpb25zLnRzY29uZmlnQmFzZSA/PyBLRmluVGVjaFRTQ29uZmlnQmFzZS5OT0RFX1ZFUlNJT05cbiAgICAgICAgICB9L3RzY29uZmlnLmpzb25gLFxuICAgICAgICBdKSxcbiAgICAgIH0sXG4gICAgICBnaXRodWI6IGZhbHNlLFxuICAgICAgY29tbWl0R2VuZXJhdGVkOiBmYWxzZSxcbiAgICAgIHJlbGVhc2U6IGZhbHNlLFxuICAgICAgdHNjb25maWdEZXY6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgLi4uVFNDT05GSUdfT1BUSU9OUyxcbiAgICAgICAgICBtb2R1bGVSZXNvbHV0aW9uOiBUeXBlU2NyaXB0TW9kdWxlUmVzb2x1dGlvbi5OT0RFMTYsXG4gICAgICAgICAgbm9FbWl0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBleHRlbmRzOiBUeXBlc2NyaXB0Q29uZmlnRXh0ZW5kcy5mcm9tUGF0aHMoW1xuICAgICAgICAgIGBAdHNjb25maWcvJHtcbiAgICAgICAgICAgIG9wdGlvbnMudHNjb25maWdCYXNlRGV2ID8/IEtGaW5UZWNoVFNDb25maWdCYXNlLk5PREVfVkVSU0lPTlxuICAgICAgICAgIH0vdHNjb25maWcuanNvbmAsXG4gICAgICAgIF0pLFxuICAgICAgfSxcbiAgICAgIGplc3Q6IHRydWUsXG4gICAgICBqZXN0T3B0aW9uczoge1xuICAgICAgICB1cGRhdGVTbmFwc2hvdDogVXBkYXRlU25hcHNob3QuTkVWRVIsXG4gICAgICB9LFxuICAgICAgdHNKZXN0T3B0aW9uczoge1xuICAgICAgICB0cmFuc2Zvcm1QYXR0ZXJuOiAnXi4rXFxcXC5tP1t0al1zeD8kJyxcbiAgICAgICAgdHJhbnNmb3JtT3B0aW9uczoge1xuICAgICAgICAgIHVzZUVTTTogb3B0aW9ucy5lc21TdXBwb3J0Q29uZmlnID8/IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYWRkRGVmYXVsdEJ1bmRsZTogdHJ1ZSxcbiAgICAgIGVzbVN1cHBvcnRDb25maWc6IHRydWUsXG4gICAgICB0c2NvbmZpZ0Jhc2U6IEtGaW5UZWNoVFNDb25maWdCYXNlLk5PREVfVkVSU0lPTixcbiAgICAgIHRzY29uZmlnQmFzZURldjogS0ZpblRlY2hUU0NvbmZpZ0Jhc2UuTk9ERV9WRVJTSU9OLFxuICAgICAgdHNjb25maWdCYXNlU3RyaWN0ZXN0OiB0cnVlLFxuICAgIH0gc2F0aXNmaWVzIFBhcnRpYWw8S0ZpblRlY2hUeXBlU2NyaXB0QXBwUHJvamVjdE9wdGlvbnM+O1xuXG4gICAgY29uc3QgTUVSR0VEX09QVElPTlMgPSBkZWVwTWVyZ2UoXG4gICAgICBbREVGQVVMVF9PUFRJT05TLCBvcHRpb25zXSxcbiAgICAgIHRydWUsXG4gICAgKSBhcyBLRmluVGVjaFR5cGVTY3JpcHRBcHBQcm9qZWN0T3B0aW9ucztcblxuICAgIHN1cGVyKHsgLi4uTUVSR0VEX09QVElPTlMsIHNhbXBsZUNvZGU6IGZhbHNlIH0pO1xuXG4gICAgdGhpcy5hZGREZXZEZXBzKFxuICAgICAgLi4ubmV3IFNldChbXG4gICAgICAgIGBAdHNjb25maWcvJHtcbiAgICAgICAgICBNRVJHRURfT1BUSU9OUy50c2NvbmZpZ0Jhc2UgPz8gS0ZpblRlY2hUU0NvbmZpZ0Jhc2UuTk9ERV9WRVJTSU9OXG4gICAgICAgIH1gLFxuICAgICAgICBgQHRzY29uZmlnLyR7XG4gICAgICAgICAgTUVSR0VEX09QVElPTlMudHNjb25maWdCYXNlRGV2ID8/IEtGaW5UZWNoVFNDb25maWdCYXNlLk5PREVfVkVSU0lPTlxuICAgICAgICB9YCxcbiAgICAgIF0pLFxuICAgICk7XG5cbiAgICAvLyBBZGQgdGhlIEVTTGludCBjb25maWd1cmF0aW9uXG4gICAgdGhpcy5lc2xpbnQ/LmFkZFJ1bGVzKGVzbGludFJ1bGVzKTtcbiAgICB0aGlzLmVzbGludD8uYWRkT3ZlcnJpZGUoZXNsaW50T3ZlcnJpZGVzKTtcbiAgICB0aGlzLmVzbGludD8uYWRkUGx1Z2lucygnQHR5cGVzY3JpcHQtZXNsaW50JywgJ2ltcG9ydCcsICdwcmV0dGllcicpO1xuICAgIHRoaXMuZXNsaW50Py5hZGRFeHRlbmRzKFxuICAgICAgJ2VzbGludDpyZWNvbW1lbmRlZCcsXG4gICAgICAncGx1Z2luOkB0eXBlc2NyaXB0LWVzbGludC9yZWNvbW1lbmRlZCcsXG4gICAgICAncGx1Z2luOkB0eXBlc2NyaXB0LWVzbGludC9yZWNvbW1lbmRlZC1yZXF1aXJpbmctdHlwZS1jaGVja2luZycsXG4gICAgICAncGx1Z2luOmltcG9ydC90eXBlc2NyaXB0JyxcbiAgICAgICdwbHVnaW46cHJldHRpZXIvcmVjb21tZW5kZWQnLFxuICAgICk7XG5cbiAgICB0aGlzLnByZXR0aWVyPy5hZGRPdmVycmlkZSh7XG4gICAgICBmaWxlczogJyonLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBzaW5nbGVRdW90ZTogdHJ1ZSxcbiAgICAgICAgdHJhaWxpbmdDb21tYTogJ2FsbCcgYXMgVHJhaWxpbmdDb21tYSxcbiAgICAgICAgc2VtaTogdHJ1ZSxcbiAgICAgICAgdGFiV2lkdGg6IDIsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKE1FUkdFRF9PUFRJT05TLmVzbGludEZpeGFibGVBc1dhcm4gPz8gdHJ1ZSkge1xuICAgICAgdGhpcy5lc2xpbnQ/LmFkZFJ1bGVzKHtcbiAgICAgICAgJ3ByZXR0aWVyL3ByZXR0aWVyJzogWyd3YXJuJ10sXG4gICAgICAgICdpbXBvcnQvb3JkZXInOiBbXG4gICAgICAgICAgJ3dhcm4nLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGdyb3VwczogWydidWlsdGluJywgJ2V4dGVybmFsJ10sXG4gICAgICAgICAgICBhbHBoYWJldGl6ZToge1xuICAgICAgICAgICAgICBvcmRlcjogJ2FzYycsXG4gICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgJ2tleS1zcGFjaW5nJzogWyd3YXJuJ10sXG4gICAgICAgICduby1tdWx0aXBsZS1lbXB0eS1saW5lcyc6IFsnd2FybiddLFxuICAgICAgICAnbm8tdHJhaWxpbmctc3BhY2VzJzogWyd3YXJuJ10sXG4gICAgICAgICdkb3Qtbm90YXRpb24nOiBbJ3dhcm4nXSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudHJ5UmVtb3ZlRmlsZSgnLmdpdGF0dHJpYnV0ZXMnKTtcbiAgICB0aGlzLmdpdGlnbm9yZS5yZW1vdmVQYXR0ZXJucygpO1xuXG4gICAgaWYgKE1FUkdFRF9PUFRJT05TLm5vZGVWZXJzaW9uKSB7XG4gICAgICBuZXcgVGV4dEZpbGUodGhpcywgJy5udm1yYycsIHtcbiAgICAgICAgbGluZXM6IFtNRVJHRURfT1BUSU9OUy5ub2RlVmVyc2lvbl0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoTUVSR0VEX09QVElPTlMuZXNtU3VwcG9ydENvbmZpZykge1xuICAgICAgdGhpcy5wYWNrYWdlLmFkZEZpZWxkKCd0eXBlJywgJ21vZHVsZScpO1xuICAgICAgW3RoaXMudHNjb25maWcsIHRoaXMudHNjb25maWdEZXZdLmZvckVhY2goXG4gICAgICAgICh0c2NvbmZpZykgPT5cbiAgICAgICAgICB0c2NvbmZpZyAmJlxuICAgICAgICAgIHRzY29uZmlnLmZpbGUucGF0Y2goXG4gICAgICAgICAgICBKc29uUGF0Y2guYWRkKCcvdHMtbm9kZScsIHtcbiAgICAgICAgICAgICAgZXNtOiB0cnVlLFxuICAgICAgICAgICAgICBwcmVmZXJUc0V4dHM6IGZhbHNlLFxuICAgICAgICAgICAgICBleHBlcmltZW50YWxTcGVjaWZpZXJSZXNvbHV0aW9uOiAnbm9kZScsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3RoaXMudHNjb25maWcsIHRoaXMudHNjb25maWdEZXZdLmZvckVhY2goXG4gICAgICAgICh0c2NvbmZpZykgPT5cbiAgICAgICAgICB0c2NvbmZpZyAmJlxuICAgICAgICAgIHRzY29uZmlnLmZpbGUucGF0Y2goXG4gICAgICAgICAgICBKc29uUGF0Y2guYWRkKCcvdHMtbm9kZScsIHtcbiAgICAgICAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgbW9kdWxlOiAnY29tbW9uanMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcmVmZXJUc0V4dHM6IHRydWUsXG4gICAgICAgICAgICAgIGV4cGVyaW1lbnRhbFNwZWNpZmllclJlc29sdXRpb246ICdub2RlJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICksXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChNRVJHRURfT1BUSU9OUy5qZXN0ICYmIHRoaXMuamVzdCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgIHRoaXMuamVzdC5jb25maWcuZ2xvYmFscyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuamVzdC5jb25maWcubW9kdWxlTmFtZU1hcHBlciA9IHtcbiAgICAgICAgJ14oXFxcXC57MSwyfS8uKilcXFxcLm0/anMkJzogJyQxJyxcbiAgICAgIH07XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgaWYgKE1FUkdFRF9PUFRJT05TLmVzbVN1cHBvcnRDb25maWcgPz8gdHJ1ZSkge1xuICAgICAgICB0aGlzLnRlc3RUYXNrLmVudihcbiAgICAgICAgICAnTk9ERV9PUFRJT05TJyxcbiAgICAgICAgICAnJChlY2hvICROT0RFX09QVElPTlMgLS1leHBlcmltZW50YWwtdm0tbW9kdWxlcyknLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChNRVJHRURfT1BUSU9OUy52c2NvZGUpIHtcbiAgICAgIGlmICghdGhpcy52c2NvZGU/LnNldHRpbmdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndnNjb2RlIHNldHRpbmdzIG5vdCBmb3VuZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy52c2NvZGU/LmV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2c2NvZGUgZXh0ZW5zaW9ucyBub3QgZm91bmQuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBTRVRUSU5HUyA9IHRoaXMudnNjb2RlPy5zZXR0aW5ncztcbiAgICAgIFNFVFRJTkdTLmFkZFNldHRpbmcoJ2plc3QuamVzdENvbW1hbmRMaW5lJywgJ25wbSB0ZXN0IC0tJyk7XG4gICAgICBTRVRUSU5HUy5hZGRTZXR0aW5nKCdqZXN0LnJvb3RQYXRoJywgJy4vJyk7XG5cbiAgICAgIGNvbnN0IEVYVEVTTklPTlMgPSB0aGlzLnZzY29kZT8uZXh0ZW5zaW9ucztcbiAgICAgIEVYVEVTTklPTlMuYWRkUmVjb21tZW5kYXRpb25zKFxuICAgICAgICAnZGJhZXVtZXIudnNjb2RlLWVzbGludCcsXG4gICAgICAgICdPcnRhLnZzY29kZS1qZXN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKE1FUkdFRF9PUFRJT05TLmFkZERlZmF1bHRCdW5kbGUgPz8gdHJ1ZSkge1xuICAgICAgdGhpcy5idW5kbGVyLmFkZEJ1bmRsZShbdGhpcy5zcmNkaXIsICdpbmRleC50cyddLmpvaW4oc2VwKSwge1xuICAgICAgICB0YXJnZXQ6ICdub2RlMTgnLFxuICAgICAgICBwbGF0Zm9ybTogJ25vZGUnLFxuICAgICAgICBmb3JtYXQ6IE1FUkdFRF9PUFRJT05TLmVzbVN1cHBvcnRDb25maWcgPz8gdHJ1ZSA/ICdlc20nIDogJ2NqcycsXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgICAgd2F0Y2hUYXNrOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKE1FUkdFRF9PUFRJT05TLnNhbXBsZUNvZGUgPz8gdHJ1ZSkge1xuICAgICAgbmV3IFNhbXBsZUNvZGUodGhpcyk7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFNhbXBsZUNvZGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9qZWN0OiBUeXBlU2NyaXB0UHJvamVjdCkge1xuICAgIHN1cGVyKHByb2plY3QpO1xuICAgIGNvbnN0IElOREVYX1NSQ19DT0RFID0gW1xuICAgICAgXCJpbXBvcnQgeyBIZWxsbyB9IGZyb20gJy4vaGVsbG8uanMnO1wiLFxuICAgICAgJycsXG4gICAgICAnY29uc29sZS5sb2coYXdhaXQgbmV3IEhlbGxvKCkuc2F5SGVsbG8oMjAwMCkpOycsXG4gICAgXS5qb2luKCdcXG4nKTtcbiAgICBjb25zdCBIRUxMT19TUkNfQ09ERSA9IFtcbiAgICAgIFwiaW1wb3J0IHsgc2V0VGltZW91dCB9IGZyb20gJ3RpbWVycy9wcm9taXNlcyc7XCIsXG4gICAgICAnZXhwb3J0IGNsYXNzIEhlbGxvIHsnLFxuICAgICAgJyAgcHVibGljIGFzeW5jIHNheUhlbGxvKGRlbGF5OiBudW1iZXIgPSAxMDApOiBQcm9taXNlPHN0cmluZz4geycsXG4gICAgICAnICAgIGF3YWl0IHNldFRpbWVvdXQoZGVsYXkpOycsXG4gICAgICBcIiAgICByZXR1cm4gJ2hlbGxvLCB3b3JsZCEnO1wiLFxuICAgICAgJyAgfScsXG4gICAgICAnfScsXG4gICAgXS5qb2luKCdcXG4nKTtcblxuICAgIGNvbnN0IFRFU1RfQ09ERSA9IFtcbiAgICAgIFwiaW1wb3J0IHsgSGVsbG8gfSBmcm9tICcuLi9zcmMvaGVsbG8uanMnO1wiLFxuICAgICAgJycsXG4gICAgICBcInRlc3QoJ2hlbGxvJywgYXN5bmMgKCkgPT4ge1wiLFxuICAgICAgJyAgY29uc3QgaGVsbG8gPSBuZXcgSGVsbG8oKTsnLFxuICAgICAgXCIgIGV4cGVjdChhd2FpdCBoZWxsby5zYXlIZWxsbygpKS50b0JlKCdoZWxsbywgd29ybGQhJyk7XCIsXG4gICAgICAnfSk7JyxcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgbmV3IFNhbXBsZURpcihwcm9qZWN0LCBwcm9qZWN0LnNyY2Rpciwge1xuICAgICAgZmlsZXM6IHtcbiAgICAgICAgJ2luZGV4LnRzJzogSU5ERVhfU1JDX0NPREUsXG4gICAgICAgICdoZWxsby50cyc6IEhFTExPX1NSQ19DT0RFLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChwcm9qZWN0Lmplc3QpIHtcbiAgICAgIG5ldyBTYW1wbGVEaXIocHJvamVjdCwgcHJvamVjdC50ZXN0ZGlyLCB7XG4gICAgICAgIGZpbGVzOiB7XG4gICAgICAgICAgJ2hlbGxvLnRlc3QudHMnOiBURVNUX0NPREUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==