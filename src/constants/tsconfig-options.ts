// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { TypeScriptCompilerOptions } from 'projen/lib/javascript';

export const TSCONFIG_OPTIONS = {
  alwaysStrict: undefined,
  declaration: undefined,
  esModuleInterop: undefined,
  exactOptionalPropertyTypes: undefined,
  experimentalDecorators: undefined,
  forceConsistentCasingInFileNames: undefined,
  inlineSourceMap: undefined,
  inlineSources: undefined,
  isolatedModules: undefined,
  lib: undefined,
  module: undefined,
  noEmitOnError: undefined,
  noFallthroughCasesInSwitch: undefined,
  noImplicitAny: undefined,
  noImplicitOverride: undefined,
  noImplicitReturns: undefined,
  noImplicitThis: undefined,
  noPropertyAccessFromIndexSignature: undefined,
  noUncheckedIndexedAccess: undefined,
  noUnusedLocals: undefined,
  noUnusedParameters: undefined,
  resolveJsonModule: undefined,
  skipLibCheck: undefined,
  strict: undefined,
  strictNullChecks: undefined,
  strictPropertyInitialization: undefined,
  stripInternal: undefined,
  target: undefined,
} satisfies Partial<TypeScriptCompilerOptions>;

export const TSCONFIG_OPTIONS_STRICT = {
  strict: true,
  exactOptionalPropertyTypes: true,
  noFallthroughCasesInSwitch: true,
  noImplicitOverride: true,
  noImplicitReturns: true,
  noPropertyAccessFromIndexSignature: true,
  noUncheckedIndexedAccess: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  isolatedModules: true,
  esModuleInterop: true,
  skipLibCheck: true,
  forceConsistentCasingInFileNames: true,
} satisfies Partial<TypeScriptCompilerOptions>;
