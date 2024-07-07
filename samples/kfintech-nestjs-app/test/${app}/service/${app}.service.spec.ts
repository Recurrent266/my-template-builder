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
  ${Name}Service
} from '../../../src/${name}/service/${name}.service';

describe('${Name}Service', () => {
  let service: ${Name}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${Name}Service],
    }).compile();

    service = module.get<${Name}Service>(${Name}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return hello world', () => {
    expect(service.getHello()).toEqual('Hello World!');
  });
});
