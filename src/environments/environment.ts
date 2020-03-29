// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  mode: 'offline' as 'online' | 'offline',
  getTokenUri: 'https://www.ngform.com/oauth/token',
  resourceUri: 'https://www.ngform.com/api/resource',
  // keyChainUri: 'http://ec2-3-15-161-248.us-east-2.compute.amazonaws.com:8081/v1/api/keyChain/mgfb-id',
  keyChainUri: 'https://www.ngform.com/api/keyChain/mgfb-id',
  authorzieUrl: 'https://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  oauthRedirectUri: 'http://localhost:4200',
  clientId:'mgfb-front'
};
