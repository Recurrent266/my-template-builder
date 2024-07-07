// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Test, TestingModule } from '@nestjs/testing';
import { 
  ${Name}Controller 
} from '../../../src/${name}/controller/${name}.controller';
import { 
  ${Name}Service 
} from '../../../src/${name}/service/${name}.service';

describe('${Name}Controller', () => {
  let ${name}Controller: ${Name}Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [${Name}Controller],
      providers: [${Name}Service],
    }).compile();

    ${name}Controller = app.get<${Name}Controller>(${Name}Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(${name}Controller.getHello()).toBe('Hello World!');
    });
  });
});
