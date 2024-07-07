import { KFinTechTypeScriptAppProject, KFinTechTypeScriptAppProjectOptions } from './kfintech-typescript-app-project';
export interface KFinTechNestJSAppProjectOptions extends KFinTechTypeScriptAppProjectOptions {
    /**
     * Name to different files like controller, service, module.
     *
     * @default hello
     *
     */
    readonly projectName?: string;
    /**
     * Add a library to NestJS project.
     *
     * @default true
     *
     */
    readonly lib?: boolean;
    /**
     * Add provider part of contract testing to NestJS project.
     *
     * @default true
     *
     */
    readonly contract?: boolean;
}
/**
 * Create a [NestJS](https://docs.nestjs.com) TypeScript project
 * @pjid kfintech-nestjs-app
 */
export declare class KFinTechNestJSAppProject extends KFinTechTypeScriptAppProject {
    constructor(options: KFinTechNestJSAppProjectOptions);
}
