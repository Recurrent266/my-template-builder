# Projen Templates for NestJS Microservice
## About the Repository

- This repository contains Projen templates for generating a NestJS-based microservice. Projen ships with default project types such as `typescript` and `typescript-app`. This project extends the Projen built-in `typescript-app` and builds a custom Projen project type (`kfintech-nestjs-app`).

## Commands to generate a Micro-service project using this projen template

1. Clone the repository:

   > git clone <https://kfintech-projen-projects.git.kfintech.git>

2. Navigate to your project directory:

   > cd kfintech-projen-projects

3. Install dependencies:

   > npm install

4. Build the project. This will compile the TypeScript project into the dist folder:

   > npm run build

5. Developers can create a sample microservice using the command from home dir:
   > npx projen new kfintech-nestjs-app --from file:{path to kfintech-projen-projects} --outdir ~/test-microservice

#### Additional optional parameters can be passed while creating the kfintech-nestjs-app:

Example:

```
npx projen new kfintech-nestjs-app \
 --from file:{path to kfintech-projen-projects} \
 --outdir=~/test-microservice
 --projectName=panCheckAPI \
 --lib true \
 --contract true
```

- #### --from:

  This is the path where you have cloned this kfintech-projen-projects repository.

- #### --outdir:

  This is the directory path where projen will generate the microservice.

- #### --lib:

  Adds a library to the NestJS project. Value should be true or false.

- #### --projectName:

  Use this to give a name to your project files and folders. Do not use 'app' as the name 'app' is reserved in the NestJS framework.

- #### --contract:

  Adds a contract testing file for the microservice as the provider API. Value should be true or false.

  Sample contract test is generated in the file test/${projectName}/${projectName}.contract-spec.ts.

  All contract tests should follow the file name pattern: ${projectName}.contract-spec.ts.

  Follow these steps to run the contract tests:

  - Run pactum-flow-server in the test/hello/contract folder: `docker compose up`
  - Run the microservice: `npm run docker:run`
