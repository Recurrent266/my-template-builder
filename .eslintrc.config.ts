// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.


export const projenrcEslintRules = {
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
    'max-len': ['error', { code: 80 }],
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
            // or { "descriptiveMessage": "Require reason for ignoring type error" },
            'ts-expect-error': true,
            // or { "descriptiveMessage": "Allow using @ts-expect-error" },
        },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    'prettier/prettier': [
        'error',
        {
            singleQuote: true,
        },
    ],
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