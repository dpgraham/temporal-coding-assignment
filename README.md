# TEMPORAL POKEMON TAKE HOME ASSIGNMENT
* Open this page at index.html
* Set "chaos=true" in query params to use chaos API calls
* Set "flakey=true" in query params to make the API calls retry twice

## COMMENTS
* Doing Vanilla HTML to prove that I still know how Javascript/HTML API's work and 
  so I can avoid the bloat and boilerplate of adding a framework


# ISSUES
* Trying to add 'page=n' to the search gave me this error with a 500 status code

```
InvalidCharacterError
    at /rbd/pnpm-volume/0e30c8f9-2d00-4981-bdf5-670eafdca7e7/node_modules/base-64/base64.js:23:36
    at Object.<anonymous> (/rbd/pnpm-volume/0e30c8f9-2d00-4981-bdf5-670eafdca7e7/node_modules/base-64/base64.js:164:2)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:168:29)
    at ModuleJob.run (node:internal/modules/esm/module_job:197:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:337:24)
```