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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvZXNsaW50LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0RBQXNEO0FBQ3RELDRFQUE0RTtBQUM1RSw0RUFBNEU7QUFDNUUseURBQXlEO0FBQ3pELHFFQUFxRTtBQUNyRSxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFDQUFxQzs7O0FBRXhCLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDcEIsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztJQUN6QixNQUFNLEVBQUU7UUFDTixPQUFPO1FBQ1AsUUFBUTtRQUNSO1lBQ0UsV0FBVyxFQUFFLElBQUk7WUFDakIscUJBQXFCLEVBQUUsSUFBSTtTQUM1QjtLQUNGO0lBQ0QsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDO0lBQzdDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDM0Isc0NBQXNDLEVBQUU7UUFDdEMsT0FBTztRQUNQO1lBQ0UsUUFBUSxFQUFFLFVBQVU7WUFDcEIsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNyQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztTQUN0RDtRQUNEO1lBQ0UsUUFBUSxFQUFFLFVBQVU7WUFDcEIsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3RCO1FBQ0Q7WUFDRSxRQUFRLEVBQUUsT0FBTztZQUNqQixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDdkI7UUFDRDtZQUNFLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN2QjtRQUNEO1lBQ0UsUUFBUSxFQUFFLFdBQVc7WUFDckIsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQ3ZCO1FBQ0Q7WUFDRSxRQUFRLEVBQUUsZUFBZTtZQUN6QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdEIsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7S0FDRjtJQUNELHdDQUF3QyxFQUFFO1FBQ3hDLE9BQU87UUFDUDtZQUNFLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QjtLQUNGO0lBQ0QsMENBQTBDLEVBQUUsT0FBTztJQUNuRCxvQ0FBb0MsRUFBRSxPQUFPO0lBQzdDLG1DQUFtQyxFQUFFO1FBQ25DLE9BQU87UUFDUDtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG1FQUFtRTtZQUNuRSxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLCtEQUErRDtTQUNoRTtLQUNGO0lBQ0QsK0JBQStCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDbEUsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixtQ0FBbUMsRUFBRSxPQUFPO0lBQzVDLFlBQVksRUFBRSxNQUFNO0lBQ3BCLHVDQUF1QyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2xELG1DQUFtQyxFQUFFO1FBQ25DLE9BQU87UUFDUDtZQUNFLGVBQWUsRUFBRTtnQkFDZixZQUFZO2dCQUNaLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxrQkFBa0I7YUFDbkI7WUFDRCxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLGdCQUFnQixFQUFFLElBQUk7U0FDdkI7S0FDRjtJQUNELHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2pDLGNBQWMsRUFBRTtRQUNkLE1BQU07UUFDTjtZQUNFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7WUFDL0IsV0FBVyxFQUFFO2dCQUNYLEtBQUssRUFBRSxLQUFLO2dCQUNaLGVBQWUsRUFBRSxJQUFJO2FBQ3RCO1NBQ0Y7S0FDRjtJQUNELHNCQUFzQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2pDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNwQiw4QkFBOEIsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN6QyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDeEIseUJBQXlCLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDcEMseUNBQXlDLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDcEQsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDMUIsaUNBQWlDLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDNUMsb0JBQW9CLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDL0IsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3pCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN2QixvQ0FBb0MsRUFBRTtRQUNwQyxPQUFPO1FBQ1A7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AscUJBQXFCO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIseUJBQXlCO2dCQUN6QixzQkFBc0I7Z0JBQ3RCLHVCQUF1QjtnQkFDdkIsT0FBTztnQkFDUCxhQUFhO2dCQUNiLFFBQVE7YUFDVDtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQUc7SUFDN0IsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDO0lBQ3ZCLEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIMKpIDIwMjQgQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy5cbi8vIEFsbCBSaWdodHMgUmVzZXJ2ZWQuIFRoaXMgQVdTIENvbnRlbnQgaXMgcHJvdmlkZWQgc3ViamVjdCB0byB0aGUgdGVybXMgb2Zcbi8vIHRoZSBBV1MgQ3VzdG9tZXIgQWdyZWVtZW50IGF2YWlsYWJsZSBhdCA8aHR0cDovL2F3cy5hbWF6b24uY29tL2FncmVlbWVudD5cbi8vIG9yIG90aGVyIHdyaXR0ZW4gYWdyZWVtZW50IGJldHdlZW4gQ3VzdG9tZXIgYW5kIGVpdGhlclxuLy8gQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLiBvciBBbWF6b24gV2ViIFNlcnZpY2UgRU1FQSBTQVJMIG9yIGJvdGguXG4vLyBDb3B5cmlnaHQgMjAyNCBBbWF6b24uY29tIGFuZCBpdHMgYWZmaWxpYXRlczsgYWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFRoaXMgZmlsZSBpcyBBbWF6b24gV2ViIFNlcnZpY2VzIENvbnRlbnQgYW5kIG1heSBub3QgYmUgZHVwbGljYXRlZFxuLy8gb3IgZGlzdHJpYnV0ZWQgd2l0aG91dCBwZXJtaXNzaW9uLlxuXG5leHBvcnQgY29uc3QgZXNsaW50UnVsZXMgPSB7XG4gIGluZGVudDogWydlcnJvcicsIDJdLFxuICBzZW1pOiBbJ2Vycm9yJywgJ2Fsd2F5cyddLFxuICBxdW90ZXM6IFtcbiAgICAnZXJyb3InLFxuICAgICdzaW5nbGUnLFxuICAgIHtcbiAgICAgIGF2b2lkRXNjYXBlOiB0cnVlLFxuICAgICAgYWxsb3dUZW1wbGF0ZUxpdGVyYWxzOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gICdjb21tYS1kYW5nbGUnOiBbJ2Vycm9yJywgJ2Fsd2F5cy1tdWx0aWxpbmUnXSxcbiAgJ21heC1saW5lcyc6IFsnZXJyb3InLCAzMDBdLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uJzogW1xuICAgICdlcnJvcicsXG4gICAge1xuICAgICAgc2VsZWN0b3I6ICd2YXJpYWJsZScsXG4gICAgICB0eXBlczogWydib29sZWFuJ10sXG4gICAgICBmb3JtYXQ6IFsnY2FtZWxDYXNlJ10sXG4gICAgICBwcmVmaXg6IFsnaXMnLCAnc2hvdWxkJywgJ2hhcycsICdjYW4nLCAnZGlkJywgJ3dpbGwnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHNlbGVjdG9yOiAnZnVuY3Rpb24nLFxuICAgICAgZm9ybWF0OiBbJ2NhbWVsQ2FzZSddLFxuICAgIH0sXG4gICAge1xuICAgICAgc2VsZWN0b3I6ICdjbGFzcycsXG4gICAgICBmb3JtYXQ6IFsnUGFzY2FsQ2FzZSddLFxuICAgIH0sXG4gICAge1xuICAgICAgc2VsZWN0b3I6ICdpbnRlcmZhY2UnLFxuICAgICAgZm9ybWF0OiBbJ1Bhc2NhbENhc2UnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHNlbGVjdG9yOiAndHlwZUFsaWFzJyxcbiAgICAgIGZvcm1hdDogWydQYXNjYWxDYXNlJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBzZWxlY3RvcjogJ3R5cGVQYXJhbWV0ZXInLFxuICAgICAgZm9ybWF0OiBbJ1Bhc2NhbENhc2UnXSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICByZWdleDogJ15UW0EtWl0nLFxuICAgICAgICBtYXRjaDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1pbmZlcnJhYmxlLXR5cGVzJzogW1xuICAgICdlcnJvcicsXG4gICAge1xuICAgICAgaWdub3JlUGFyYW1ldGVyczogdHJ1ZSxcbiAgICAgIGlnbm9yZVByb3BlcnRpZXM6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24nOiAnZXJyb3InLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSc6ICdlcnJvcicsXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQnOiBbXG4gICAgJ2Vycm9yJyxcbiAgICB7XG4gICAgICAndHMtaWdub3JlJzogdHJ1ZSxcbiAgICAgIC8vIG9yIHsgXCJkZXNjcmlwdGl2ZU1lc3NhZ2VcIjogXCJSZXF1aXJlIHJlYXNvbiBmb3IgaWdub3JpbmcgdHlwZVwiIH0sXG4gICAgICAndHMtZXhwZWN0LWVycm9yJzogdHJ1ZSxcbiAgICAgIC8vIG9yIHsgXCJkZXNjcmlwdGl2ZU1lc3NhZ2VcIjogXCJBbGxvdyB1c2luZyBAdHMtZXhwZWN0LWVycm9yXCIgfSxcbiAgICB9LFxuICBdLFxuICAnQHR5cGVzY3JpcHQtZXNsaW50L2FycmF5LXR5cGUnOiBbJ2Vycm9yJywgeyBkZWZhdWx0OiAnZ2VuZXJpYycgfV0sXG4gICdwcmV0dGllci9wcmV0dGllcic6ICdlcnJvcicsXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMnOiAnZXJyb3InLFxuICAnbm8tY29uc29sZSc6ICd3YXJuJyxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMnOiBbJ2Vycm9yJ10sXG4gICdpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnOiBbXG4gICAgJ2Vycm9yJyxcbiAgICB7XG4gICAgICBkZXZEZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgJyoqL3Rlc3QvKionLFxuICAgICAgICAnKiovYnVpbGQtdG9vbHMvKionLFxuICAgICAgICAnLnByb2plbnJjLnRzJyxcbiAgICAgICAgJ3Byb2plbnJjLyoqLyoudHMnLFxuICAgICAgXSxcbiAgICAgIG9wdGlvbmFsRGVwZW5kZW5jaWVzOiBmYWxzZSxcbiAgICAgIHBlZXJEZXBlbmRlbmNpZXM6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgJ2ltcG9ydC9uby11bnJlc29sdmVkJzogWydlcnJvciddLFxuICAnaW1wb3J0L29yZGVyJzogW1xuICAgICd3YXJuJyxcbiAgICB7XG4gICAgICBncm91cHM6IFsnYnVpbHRpbicsICdleHRlcm5hbCddLFxuICAgICAgYWxwaGFiZXRpemU6IHtcbiAgICAgICAgb3JkZXI6ICdhc2MnLFxuICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gICduby1kdXBsaWNhdGUtaW1wb3J0cyc6IFsnZXJyb3InXSxcbiAgJ25vLXNoYWRvdyc6IFsnb2ZmJ10sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvbm8tc2hhZG93JzogWydlcnJvciddLFxuICAna2V5LXNwYWNpbmcnOiBbJ2Vycm9yJ10sXG4gICduby1tdWx0aXBsZS1lbXB0eS1saW5lcyc6IFsnZXJyb3InXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlcyc6IFsnZXJyb3InXSxcbiAgJ25vLXJldHVybi1hd2FpdCc6IFsnb2ZmJ10sXG4gICdAdHlwZXNjcmlwdC1lc2xpbnQvcmV0dXJuLWF3YWl0JzogWydlcnJvciddLFxuICAnbm8tdHJhaWxpbmctc3BhY2VzJzogWydlcnJvciddLFxuICAnZG90LW5vdGF0aW9uJzogWydlcnJvciddLFxuICAnbm8tYml0d2lzZSc6IFsnZXJyb3InXSxcbiAgJ0B0eXBlc2NyaXB0LWVzbGludC9tZW1iZXItb3JkZXJpbmcnOiBbXG4gICAgJ2Vycm9yJyxcbiAgICB7XG4gICAgICBkZWZhdWx0OiBbXG4gICAgICAgICdwdWJsaWMtc3RhdGljLWZpZWxkJyxcbiAgICAgICAgJ3B1YmxpYy1zdGF0aWMtbWV0aG9kJyxcbiAgICAgICAgJ3Byb3RlY3RlZC1zdGF0aWMtZmllbGQnLFxuICAgICAgICAncHJvdGVjdGVkLXN0YXRpYy1tZXRob2QnLFxuICAgICAgICAncHJpdmF0ZS1zdGF0aWMtZmllbGQnLFxuICAgICAgICAncHJpdmF0ZS1zdGF0aWMtbWV0aG9kJyxcbiAgICAgICAgJ2ZpZWxkJyxcbiAgICAgICAgJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgJ21ldGhvZCcsXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgZXNsaW50T3ZlcnJpZGVzID0ge1xuICBmaWxlczogWycucHJvamVucmMudHMnXSxcbiAgcnVsZXM6IHtcbiAgICAnbWF4LWxlbic6ICdvZmYnLFxuICB9LFxufTtcbiJdfQ==