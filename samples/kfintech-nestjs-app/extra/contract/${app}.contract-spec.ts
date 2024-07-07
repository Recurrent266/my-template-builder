// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { flow, reporter } from 'pactum';
import { addPactumFlowReporter, setupPactumFlowServer } from './pactum';

const setupPactum = () => {
  setupPactumFlowServer();
  addPactumFlowReporter('${name}-service', '${Name} Service');
};

describe('${Name} Service Provider Contract Tests', () => {
  let baseUrl: string;

  beforeAll(() => {
    const HOST = 'localhost';
    const PORT = 3000;

    baseUrl = `http://${HOST}:${PORT}`;

    setupPactum();
  });

  afterAll(async () => {
    await reporter.end();
  });

  it('should return Hello World!', async () => {
    const _FLOW = flow('get-hello');
    await _FLOW.get(baseUrl + '/api/v1/${name}').expectStatus(200);
    // .expect('Hello World!');
  });
});
