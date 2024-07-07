import { TypeScriptAppProject, TypeScriptProjectOptions } from 'projen/lib/typescript';
export declare enum KFinTechTSConfigBase {
    NODE_VERSION = "node18"
}
export interface KFinTechTypeScriptAppProjectOptions extends TypeScriptProjectOptions {
    readonly addDefaultBundle?: boolean;
    readonly esmSupportConfig?: boolean;
    readonly eslintFixableAsWarn?: boolean;
    readonly nodeVersion?: string;
    readonly tsconfigBase?: KFinTechTSConfigBase;
    readonly tsconfigBaseDev?: KFinTechTSConfigBase;
    readonly tsconfigBaseStrictest?: boolean;
}
/**
 * Create a [TypeScriptAppProject]
 * @pjid kfintech-typescript-app
 */
export declare class KFinTechTypeScriptAppProject extends TypeScriptAppProject {
    constructor(options: KFinTechTypeScriptAppProjectOptions);
}
