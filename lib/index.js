"use strict";
// © 2024 Amazon Web Services, Inc. or its affiliates.
// All Rights Reserved. This AWS Content is provided subject to the terms of
// the AWS Customer Agreement available at <http://aws.amazon.com/agreement>
// or other written agreement between Customer and either
// Amazon Web Services, Inc. or Amazon Web Service EMEA SARL or both.
// Copyright 2024 Amazon.com and its affiliates; all rights reserved.
// This file is Amazon Web Services Content and may not be duplicated
// or distributed without permission.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./kfintech-typescript-app-project"), exports);
__exportStar(require("./kfintech-nestjs-app-project"), exports);
__exportStar(require("./utils/replace-placeholders"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNEQUFzRDtBQUN0RCw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFLHlEQUF5RDtBQUN6RCxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUNyRSxxQ0FBcUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFckMsb0VBQWtEO0FBQ2xELGdFQUE4QztBQUM5QywrREFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDCqSAyMDI0IEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuXG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLiBUaGlzIEFXUyBDb250ZW50IGlzIHByb3ZpZGVkIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mXG4vLyB0aGUgQVdTIEN1c3RvbWVyIEFncmVlbWVudCBhdmFpbGFibGUgYXQgPGh0dHA6Ly9hd3MuYW1hem9uLmNvbS9hZ3JlZW1lbnQ+XG4vLyBvciBvdGhlciB3cml0dGVuIGFncmVlbWVudCBiZXR3ZWVuIEN1c3RvbWVyIGFuZCBlaXRoZXJcbi8vIEFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4gb3IgQW1hem9uIFdlYiBTZXJ2aWNlIEVNRUEgU0FSTCBvciBib3RoLlxuLy8gQ29weXJpZ2h0IDIwMjQgQW1hem9uLmNvbSBhbmQgaXRzIGFmZmlsaWF0ZXM7IGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBUaGlzIGZpbGUgaXMgQW1hem9uIFdlYiBTZXJ2aWNlcyBDb250ZW50IGFuZCBtYXkgbm90IGJlIGR1cGxpY2F0ZWRcbi8vIG9yIGRpc3RyaWJ1dGVkIHdpdGhvdXQgcGVybWlzc2lvbi5cblxuZXhwb3J0ICogZnJvbSAnLi9rZmludGVjaC10eXBlc2NyaXB0LWFwcC1wcm9qZWN0JztcbmV4cG9ydCAqIGZyb20gJy4va2ZpbnRlY2gtbmVzdGpzLWFwcC1wcm9qZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvcmVwbGFjZS1wbGFjZWhvbGRlcnMnO1xuIl19