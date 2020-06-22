## Get started
    1. change to app root  
    2. run ```ng build mt-form-builder --prod --watch``` to start angular library  
    3. run ng serve to start host application  
## Public
    1. run ng build mt-form-builder --prod  
    2. run npm login  
    3. change to output-lib/mt-form-builder folder  
    4. npm publish  
## Running end-to-end tests
Run e2e with IE  
    1. make sure : directConnect set to false,  
    2. make sure : 'browserName': 'internet explorer',  
    3. flow to run e2e :  
        webdriver-manager clean  
        webdriver-manager update --ie --versions.standalone 3.4.0 --versions.ie 3.4.0  
        webdriver-manager start --versions.standalone 3.4.0 --versions.ie 3.4.0  
    4. if not work stop webdriver-manager, redo above steps  
    5. make sure all IE mode set to be protected  
Run e2e with Chrome  
    1.make sure : directConnect set to true,  
    2.make sure : 'browserName': 'chrome',  
Wathc for any changes in Ng Library  
    1.ng build mt-form-builder --watch  
## Tips
    1.^\s*$\n regex to remove blank line
## Defects found so far
    1. auto import will cause 'ng serve' failed, mannually update import path to relative  
    2.
