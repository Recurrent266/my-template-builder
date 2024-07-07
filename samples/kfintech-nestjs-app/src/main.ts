// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { instance, otelSDK } from 'kfin.common.libs.core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { initSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const configService = app.get(ConfigService);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`],
        },
      },
    }),
  );

  app.enableCors({
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  initSwagger(app);

  if (configService.get('TRACING_ENABLED') == 'true') {
    otelSDK.start();
  }
  await app.listen(configService.get('PORT') as number);
}
void bootstrap();
