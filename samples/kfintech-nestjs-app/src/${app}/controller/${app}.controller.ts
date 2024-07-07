// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.

import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ${Name}Service } from "../service/${name}.service";


@Controller('${name}')
export class ${Name}Controller {
    constructor(private readonly ${name}Service: ${Name}Service) {}

    @Get()
    @ApiOkResponse({ description: "Hello World!" })
    getHello(): string {
        return this.${name}Service.getHello();
    }
}
