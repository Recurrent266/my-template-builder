// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Module } from '@nestjs/common';
import { 
  ${Name}Controller 
} from '../${name}/controller/${name}.controller';
import { 
  ${Name}Service 
} from '../${name}/service/${name}.service';

@Module({
  imports: [],
  controllers: [${Name}Controller],
  providers: [${Name}Service],
})
export class ${Name}Module {}
