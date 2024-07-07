// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Server } from 'node:net';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { 
  ${Name}Module
} from '../../../src/${name}/${name}.module';

describe('${Name}Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [${Name}Module],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/${name} (GET)', () => {
    return request(app.getHttpServer() as Server)
      .get('/${name}')
      .expect(200)
      .expect('Hello World!');
  });
});