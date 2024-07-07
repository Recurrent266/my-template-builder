"use strict";
// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintOverrides = exports.eslintRules = void 0;
exports.eslintRules = {
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: [
        'error',
        'single',
        {
            avoidEscape: true,
            allowTemplateLiterals: true,
        },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'max-lines': ['error', 300],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'variable',
            types: ['boolean'],
            format: ['camelCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
            selector: 'function',
            format: ['camelCase'],
        },
        {
            selector: 'class',
            format: ['PascalCase'],
        },
        {
            selector: 'interface',
            format: ['PascalCase'],
        },
        {
            selector: 'typeAlias',
            format: ['PascalCase'],
        },
        {
            selector: 'typeParameter',
            format: ['PascalCase'],
            custom: {
                regex: '^T[A-Z]',
                match: true,
            },
        },
    ],
    '@typescript-eslint/no-inferrable-types': [
        'error',
        {
            ignoreParameters: true,
            ignoreProperties: true,
        },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': [
        'error',
        {
            'ts-ignore': true,
            // or { "descriptiveMessage": "Require reason for ignoring type" },
            'ts-expect-error': true,
            // or { "descriptiveMessage": "Allow using @ts-expect-error" },
        },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-require-imports': ['error'],
    'import/no-extraneous-dependencies': [
        'error',
        {
            devDependencies: [
                '**/test/**',
                '**/build-tools/**',
                '.projenrc.ts',
                'projenrc/**/*.ts',
            ],
            optionalDependencies: false,
            peerDependencies: true,
        },
    ],
    'import/no-unresolved': ['error'],
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
    'no-duplicate-imports': ['error'],
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['error'],
    'key-spacing': ['error'],
    'no-multiple-empty-lines': ['error'],
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-return-await': ['off'],
    '@typescript-eslint/return-await': ['error'],
    'no-trailing-spaces': ['error'],
    'dot-notation': ['error'],
    'no-bitwise': ['error'],
    '@typescript-eslint/member-ordering': [
        'error',
        {
            default: [
                'public-static-field',
                'public-static-method',
                'protected-static-field',
                'protected-static-method',
                'private-static-field',
                'private-static-method',
                'field',
                'constructor',
                'method',
            ],
        },
    ],
};
exports.eslintOverrides = {
    files: ['.projenrc.ts'],
    rules: {
        'max-len': 'off',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy9lc2xpbnRDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNEQUFzRDtBQUN0RCw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFLHlEQUF5RDtBQUN6RCxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUNyRSxxQ0FBcUM7OztBQUV4QixRQUFBLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7SUFDekIsTUFBTSxFQUFFO1FBQ04sT0FBTztRQUNQLFFBQVE7UUFDUjtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLHFCQUFxQixFQUFFLElBQUk7U0FDNUI7S0FDRjtJQUNELGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztJQUM3QyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO0lBQzNCLHNDQUFzQyxFQUFFO1FBQ3RDLE9BQU87UUFDUDtZQUNFLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQixNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDckIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDdEQ7UUFDRDtZQUNFLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN0QjtRQUNEO1lBQ0UsUUFBUSxFQUFFLE9BQU87WUFDakIsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQ3ZCO1FBQ0Q7WUFDRSxRQUFRLEVBQUUsV0FBVztZQUNyQixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDdkI7UUFDRDtZQUNFLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN2QjtRQUNEO1lBQ0UsUUFBUSxFQUFFLGVBQWU7WUFDekIsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3RCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGO0tBQ0Y7SUFDRCx3Q0FBd0MsRUFBRTtRQUN4QyxPQUFPO1FBQ1A7WUFDRSxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGdCQUFnQixFQUFFLElBQUk7U0FDdkI7S0FDRjtJQUNELDBDQUEwQyxFQUFFLE9BQU87SUFDbkQsb0NBQW9DLEVBQUUsT0FBTztJQUM3QyxtQ0FBbUMsRUFBRTtRQUNuQyxPQUFPO1FBQ1A7WUFDRSxXQUFXLEVBQUUsSUFBSTtZQUNqQixtRUFBbUU7WUFDbkUsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QiwrREFBK0Q7U0FDaEU7S0FDRjtJQUNELCtCQUErQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ2xFLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsbUNBQW1DLEVBQUUsT0FBTztJQUM1QyxZQUFZLEVBQUUsTUFBTTtJQUNwQix1Q0FBdUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNsRCxtQ0FBbUMsRUFBRTtRQUNuQyxPQUFPO1FBQ1A7WUFDRSxlQUFlLEVBQUU7Z0JBQ2YsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2Qsa0JBQWtCO2FBQ25CO1lBQ0Qsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCO0tBQ0Y7SUFDRCxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxjQUFjLEVBQUU7UUFDZCxNQUFNO1FBQ047WUFDRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1lBQy9CLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixlQUFlLEVBQUUsSUFBSTthQUN0QjtTQUNGO0tBQ0Y7SUFDRCxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDcEIsOEJBQThCLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDekMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3hCLHlCQUF5QixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3BDLHlDQUF5QyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3BELGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQzFCLGlDQUFpQyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQzVDLG9CQUFvQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQy9CLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN6QixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDdkIsb0NBQW9DLEVBQUU7UUFDcEMsT0FBTztRQUNQO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHlCQUF5QjtnQkFDekIsc0JBQXNCO2dCQUN0Qix1QkFBdUI7Z0JBQ3ZCLE9BQU87Z0JBQ1AsYUFBYTtnQkFDYixRQUFRO2FBQ1Q7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFHO0lBQzdCLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUN2QixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsS0FBSztLQUNqQjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDCqSAyMDI0IEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuXG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLiBUaGlzIEFXUyBDb250ZW50IGlzIHByb3ZpZGVkIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mXG4vLyB0aGUgQVdTIEN1c3RvbWVyIEFncmVlbWVudCBhdmFpbGFibGUgYXQgPGh0dHA6Ly9hd3MuYW1hem9uLmNvbS9hZ3JlZW1lbnQ+XG4vLyBvciBvdGhlciB3cml0dGVuIGFncmVlbWVudCBiZXR3ZWVuIEN1c3RvbWVyIGFuZCBlaXRoZXJcbi8vIEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgQW1hem9uIFdlYiBTZXJ2aWNlIEVNRUEgU0FSTCBvciBib3RoLlxuLy8gQ29weXJpZ2h0IDIwMjQgQW1hem9uLmNvbSBhbmQgaXRzIGFmZmlsaWF0ZXM7IGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBUaGlzIGZpbGUgaXMgQW1hem9uIFdlYiBTZXJ2aWNlcyBDb250ZW50IGFuZCBtYXkgbm90IGJlIGR1cGxpY2F0ZWRcbi8vIG9yIGRpc3RyaWJ1dGVkIHdpdGhvdXQgcGVybWlzc2lvbi5cblxuZXhwb3J0IGNvbnN0IGVzbGludFJ1bGVzID0ge1xuICBpbmRlbnQ6IFsnZXJyb3InLCAyXSxcbiAgc2VtaTogWydlcnJvcicsICdhbHdheXMnXSxcbiAgcXVvdGVzOiBbXG4gICAgJ2Vycm9yJyxcbiAgICAnc2luZ2xlJyxcbiAgICB7XG4gICAgICBhdm9pZEVzY2FwZTogdHJ1ZSxcbiAgICAgIGFsbG93VGVtcGxhdGVMaXRlcmFsczogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICAnY29tbWEtZGFuZ2xlJzogWydlcnJvcicsICdhbHdheXMtbXVsdGlsaW5lJ10sXG4gICdtYXgtbGluZXMnOiBbJ2Vycm9yJywgMzAwXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbic6IFtcbiAgICAnZXJyb3InLFxuICAgIHtcbiAgICAgIHNlbGVjdG9yOiAndmFyaWFibGUnLFxuICAgICAgdHlwZXM6IFsnYm9vbGVhbiddLFxuICAgICAgZm9ybWF0OiBbJ2NhbWVsQ2FzZSddLFxuICAgICAgcHJlZml4OiBbJ2lzJywgJ3Nob3VsZCcsICdoYXMnLCAnY2FuJywgJ2RpZCcsICd3aWxsJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBzZWxlY3RvcjogJ2Z1bmN0aW9uJyxcbiAgICAgIGZvcm1hdDogWydjYW1lbENhc2UnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHNlbGVjdG9yOiAnY2xhc3MnLFxuICAgICAgZm9ybWF0OiBbJ1Bhc2NhbENhc2UnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHNlbGVjdG9yOiAnaW50ZXJmYWNlJyxcbiAgICAgIGZvcm1hdDogWydQYXNjYWxDYXNlJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBzZWxlY3RvcjogJ3R5cGVBbGlhcycsXG4gICAgICBmb3JtYXQ6IFsnUGFzY2FsQ2FzZSddLFxuICAgIH0sXG4gICAge1xuICAgICAgc2VsZWN0b3I6ICd0eXBlUGFyYW1ldGVyJyxcbiAgICAgIGZvcm1hdDogWydQYXNjYWxDYXNlJ10sXG4gICAgICBjdXN0b206IHtcbiAgICAgICAgcmVnZXg6ICdeVFtBLVpdJyxcbiAgICAgICAgbWF0Y2g6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW5mZXJyYWJsZS10eXBlcyc6IFtcbiAgICAnZXJyb3InLFxuICAgIHtcbiAgICAgIGlnbm9yZVBhcmFtZXRlcnM6IHRydWUsXG4gICAgICBpZ25vcmVQcm9wZXJ0aWVzOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uJzogJ2Vycm9yJyxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnknOiAnZXJyb3InLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50JzogW1xuICAgICdlcnJvcicsXG4gICAge1xuICAgICAgJ3RzLWlnbm9yZSc6IHRydWUsXG4gICAgICAvLyBvciB7IFwiZGVzY3JpcHRpdmVNZXNzYWdlXCI6IFwiUmVxdWlyZSByZWFzb24gZm9yIGlnbm9yaW5nIHR5cGVcIiB9LFxuICAgICAgJ3RzLWV4cGVjdC1lcnJvcic6IHRydWUsXG4gICAgICAvLyBvciB7IFwiZGVzY3JpcHRpdmVNZXNzYWdlXCI6IFwiQWxsb3cgdXNpbmcgQHRzLWV4cGVjdC1lcnJvclwiIH0sXG4gICAgfSxcbiAgXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9hcnJheS10eXBlJzogWydlcnJvcicsIHsgZGVmYXVsdDogJ2dlbmVyaWMnIH1dLFxuICAncHJldHRpZXIvcHJldHRpZXInOiAnZXJyb3InLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzJzogJ2Vycm9yJyxcbiAgJ25vLWNvbnNvbGUnOiAnd2FybicsXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzJzogWydlcnJvciddLFxuICAnaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJzogW1xuICAgICdlcnJvcicsXG4gICAge1xuICAgICAgZGV2RGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICcqKi90ZXN0LyoqJyxcbiAgICAgICAgJyoqL2J1aWxkLXRvb2xzLyoqJyxcbiAgICAgICAgJy5wcm9qZW5yYy50cycsXG4gICAgICAgICdwcm9qZW5yYy8qKi8qLnRzJyxcbiAgICAgIF0sXG4gICAgICBvcHRpb25hbERlcGVuZGVuY2llczogZmFsc2UsXG4gICAgICBwZWVyRGVwZW5kZW5jaWVzOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gICdpbXBvcnQvbm8tdW5yZXNvbHZlZCc6IFsnZXJyb3InXSxcbiAgJ2ltcG9ydC9vcmRlcic6IFtcbiAgICAnd2FybicsXG4gICAge1xuICAgICAgZ3JvdXBzOiBbJ2J1aWx0aW4nLCAnZXh0ZXJuYWwnXSxcbiAgICAgIGFscGhhYmV0aXplOiB7XG4gICAgICAgIG9yZGVyOiAnYXNjJyxcbiAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICAnbm8tZHVwbGljYXRlLWltcG9ydHMnOiBbJ2Vycm9yJ10sXG4gICduby1zaGFkb3cnOiBbJ29mZiddLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L25vLXNoYWRvdyc6IFsnZXJyb3InXSxcbiAgJ2tleS1zcGFjaW5nJzogWydlcnJvciddLFxuICAnbm8tbXVsdGlwbGUtZW1wdHktbGluZXMnOiBbJ2Vycm9yJ10sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZmxvYXRpbmctcHJvbWlzZXMnOiBbJ2Vycm9yJ10sXG4gICduby1yZXR1cm4tYXdhaXQnOiBbJ29mZiddLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L3JldHVybi1hd2FpdCc6IFsnZXJyb3InXSxcbiAgJ25vLXRyYWlsaW5nLXNwYWNlcyc6IFsnZXJyb3InXSxcbiAgJ2RvdC1ub3RhdGlvbic6IFsnZXJyb3InXSxcbiAgJ25vLWJpdHdpc2UnOiBbJ2Vycm9yJ10sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbWVtYmVyLW9yZGVyaW5nJzogW1xuICAgICdlcnJvcicsXG4gICAge1xuICAgICAgZGVmYXVsdDogW1xuICAgICAgICAncHVibGljLXN0YXRpYy1maWVsZCcsXG4gICAgICAgICdwdWJsaWMtc3RhdGljLW1ldGhvZCcsXG4gICAgICAgICdwcm90ZWN0ZWQtc3RhdGljLWZpZWxkJyxcbiAgICAgICAgJ3Byb3RlY3RlZC1zdGF0aWMtbWV0aG9kJyxcbiAgICAgICAgJ3ByaXZhdGUtc3RhdGljLWZpZWxkJyxcbiAgICAgICAgJ3ByaXZhdGUtc3RhdGljLW1ldGhvZCcsXG4gICAgICAgICdmaWVsZCcsXG4gICAgICAgICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICdtZXRob2QnLFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGNvbnN0IGVzbGludE92ZXJyaWRlcyA9IHtcbiAgZmlsZXM6IFsnLnByb2plbnJjLnRzJ10sXG4gIHJ1bGVzOiB7XG4gICAgJ21heC1sZW4nOiAnb2ZmJyxcbiAgfSxcbn07XG4iXX0=