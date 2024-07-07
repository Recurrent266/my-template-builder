// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { reporter } from 'pactum';
import { config, reporter as pfpreporter } from 'pactum-flow-plugin';

export const setupPactumFlowServer = () => {
  config.url = 'http://localhost:8080';
  config.version = Date.now().toString();
  config.username = 'admin';
  config.password = 'admin';
  reporter.add(pfpreporter);
};

export const addPactumFlowReporter = (pId: string, pName: string) => {
  config.projectId = pId;
  config.projectName = pName;
};
