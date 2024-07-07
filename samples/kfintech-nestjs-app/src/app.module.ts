// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import {MiddlewareConsumer, Module, NestModule, Logger} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthGuard, LoggerMiddleware,
    PostgresDBConfigService, jwtConstants} from 'kfin.common.libs.core';
import {OpenTelemetryModule} from 'nestjs-otel';
import {envConfig} from './config/env.config';
import {HealthModule} from './health/health.module';
import {HelloModule} from './hello/hello.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [envConfig],
            isGlobal: true,
        }), JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '600s'},
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresDBConfigService,
            inject: [PostgresDBConfigService]
        }),
        HealthModule,
        HelloModule,
        OpenTelemetryModule.forRoot(),
    ],
    controllers: [],
    providers: [Logger, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
