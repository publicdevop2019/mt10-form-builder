## Purpose of this proejct
- think it as a render engine, it takes json configuration and output angular material form
- form control and form group are handled automatically
- it supports displaying error message but it does not do validation
- it support httml attributes required but again it only render differently but validation will not be there
- for validation, refer to oauth-ui validation engine
- it has build in i18n support through a simple map object
## Get started
    1. change to app root  
    2. run ```ng build mt-form-builder --prod --watch``` to start angular library  
    3. run ng serve to start host application  
## Publish to npm repository
    0. open projects/mt-form-builder/package.json, increase version number then save & continue  
    1. ng build mt-form-builder --prod (or npm run build:lib)  
    2. npm login  
    3. cd output-lib/mt-form-builder (or npm run publish:lib)  
    4. npm publish  