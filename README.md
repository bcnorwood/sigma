# SIGma
**SIG**ma (**S**erverless **I**mage **G**allery) is a simple photo viewer built for AWS, using Lambdas, DynamoDB, S3, and API Gateway to provide arbitrarily scalable, highly available services with industry-leading security controls. React Router and server-side rendering allow seamless browser history integration without page reloads.

## Dependencies
SIGma relies on [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/) and [pip](https://pip.pypa.io/en/stable/) to manage JavaScript and Python dependencies, respectively. It also requires access to a properly configured AWS platform and the [AWS CLI Tools](https://aws.amazon.com/cli/) to deploy.

## Features
* upload multiple files at once with AJAX
* browse and upload without re-rendering
* save on bandwidth thanks to brotli encoding of the UI
* soft delete with a DynamoDB item flag and an S3 object tag policy

## Possible Future Enhancements
* use a Python image library to offer thumbnails
* support image metadata - names, descriptions, locations,  etc.
* provide database caching and/or full page caching
* compress images in S3 (brotli? gzip?)
* unit/functional/integration tests
* write a CloudFormation script to automate AWS configuration

## Script Reference

### UI
From the `ui` directory:
* Install and store dependencies: `npm install` or `yarn`
* Clean build directory: `npm run clean` or `yarn clean`
* Build all targets: `npm run build` or `yarn build`
  * Build server-side renderer: `npm run build:server` or `yarn build:server`
  * Build client application: `npm run build:client` or `yarn build:client`
  * Build CSS: `npm run build:styles` or `yarn build:styles`
* Store all targets in archive: `npm run store` or `yarn store`
  * Store server-side renderer: `npm run store:server` or `yarn store:server`
  * Store client application: `npm run store:client` or `yarn store:client`
  * Store CSS: `npm run store:styles` or `yarn store:styles`
* Refresh (clean, build, store, and deploy) all targets: `npm run refresh` or `yarn refresh`
  * Refresh server-side renderer: `npm run refresh:server` or `yarn refresh:server`
  * Refresh client application: `npm run refresh:client` or `yarn refresh:client`
  * Refresh CSS: `npm run refresh:styles` or `yarn refresh:styles`
* Deploy archive to AWS: `npm run deploy` or `yarn deploy`

### API
From the `api` directory:
* Install and store dependencies: `./store_modules`
* Store application and deploy archive to AWS: `./deploy`

## Other notes
I'm still working on making the application more configurable - there are a lot of hardcoded values as I've been focused on functionality. Additionally, I ended up configuring an endpoint in the sigma-ui (HTTP) API Gateway to handle uploads, since the sigma-api (REST) API Gateway would not properly handle multipart/form-data. As a result, the upload function does not have a REST endpoint (it probably could, but I like that the route serves as a reminder that it's not in the REST API). Ideally, I'd like to avoid handling the uploads with Lambda altogether, as this severely limits the size of each request.
