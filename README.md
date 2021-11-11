## Purpose of this proejct
- think it as a render engine, it takes json configuration and output angular material form
- form control and form group are handled automatically
- it supports displaying error message but it does not do validation
- it support html attributes like required but no validation
- for validation, refer to oauth-ui validation engine
- it has build in i18n support through a simple map object
## Get started
    1. change to app root  
    2. run ```ng build mt-form-builder --prod --watch``` to start angular library  
    3. run ng serve to start host application  
## Publish to npm repository
    0. open projects/mt-form-builder/package.json, increase version number then save & continue  
    1. npm run build:lib  
    2. npm login  
    3. npm run publish:lib
    4. npm publish  
## Test
- npm run test:lib