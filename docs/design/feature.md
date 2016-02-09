# Features

While subtle feature changes will come and go, here's a list of general features that this starter kit should maintain.

## Organization

 - Projects should be organized in a way that makes sense as a product, and not by the type of technology they are
 - Large Javascript applications should be modular, and spread across multiple files and namespaces
 - Large CSS systems should be modular, and spread across multiple files and namespaces
 - Template systems should have the ability to include partials or snippets for code re-use

## Building

 - There should be a command to build the entirety of the static site in HTML, Javascript, and CSS
   - e.g. `make build`
 - There should be a command to watch for file changes and incrementally build HTML, Javascript, and CSS
   - e.g. `make watch`
   - While the initial build may take longer than others, incremental builds should not take longer than 1 second
   - Changes should ideally be reflected in browser without a reload, via some live reloading or hot swapping mechanism
 - There should be a command to run a local server for development
   - e.g. `make run`

## Linting

 - There should be a command to statically analyze Javascript and SCSS.
   - e.g. `make lint`
  
## Testing

 - There should be a command to run unit and integration tests for Javascript
   - e.g. `make test`
   - Unit tests should be run against real browser engines
 - There should be a command to run end to end tests for the whole application
   - e.g. `make test_e2e`
   
## CI

 - There should be built-in scripts to run automated testing in Jenkins
 
## Deployment

 - Deployment artifacts should be as small as possible
   - e.g. Minification, dead code elimination, optimization, etc
 - There should be a mechanism to fingerprint assets for cache busting
 - There should be a mechanism to replace references of fingerprinted files
 - There should be a deployment script to an S3 bucket
 
