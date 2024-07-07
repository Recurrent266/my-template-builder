export declare const eslintRules: {
    indent: (string | number)[];
    semi: string[];
    quotes: (string | {
        avoidEscape: boolean;
        allowTemplateLiterals: boolean;
    })[];
    'comma-dangle': string[];
    'max-lines': (string | number)[];
    '@typescript-eslint/naming-convention': (string | {
        selector: string;
        types: string[];
        format: string[];
        prefix: string[];
        custom?: undefined;
    } | {
        selector: string;
        format: string[];
        types?: undefined;
        prefix?: undefined;
        custom?: undefined;
    } | {
        selector: string;
        format: string[];
        custom: {
            regex: string;
            match: boolean;
        };
        types?: undefined;
        prefix?: undefined;
    })[];
    '@typescript-eslint/no-inferrable-types': (string | {
        ignoreParameters: boolean;
        ignoreProperties: boolean;
    })[];
    '@typescript-eslint/no-non-null-assertion': string;
    '@typescript-eslint/no-explicit-any': string;
    '@typescript-eslint/ban-ts-comment': (string | {
        'ts-ignore': boolean;
        'ts-expect-error': boolean;
    })[];
    '@typescript-eslint/array-type': (string | {
        default: string;
    })[];
    'prettier/prettier': string;
    '@typescript-eslint/no-unused-vars': string;
    'no-console': string;
    '@typescript-eslint/no-require-imports': string[];
    'import/no-extraneous-dependencies': (string | {
        devDependencies: string[];
        optionalDependencies: boolean;
        peerDependencies: boolean;
    })[];
    'import/no-unresolved': string[];
    'import/order': (string | {
        groups: string[];
        alphabetize: {
            order: string;
            caseInsensitive: boolean;
        };
    })[];
    'no-duplicate-imports': string[];
    'no-shadow': string[];
    '@typescript-eslint/no-shadow': string[];
    'key-spacing': string[];
    'no-multiple-empty-lines': string[];
    '@typescript-eslint/no-floating-promises': string[];
    'no-return-await': string[];
    '@typescript-eslint/return-await': string[];
    'no-trailing-spaces': string[];
    'dot-notation': string[];
    'no-bitwise': string[];
    '@typescript-eslint/member-ordering': (string | {
        default: string[];
    })[];
};
export declare const eslintOverrides: {
    files: string[];
    rules: {
        'max-len': string;
    };
};
