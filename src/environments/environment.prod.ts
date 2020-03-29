export const environment = {
  production: true,
  mode: 'online' as 'online' | 'offline',
  getTokenUri: 'https://www.ngform.com/oauth/token',
  resourceUri: 'https://www.ngform.com/api/resource',
  keyChainUri: 'https://www.ngform.com/api/keyChain/mgfb-id',
  authorzieUrl: 'https://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  oauthRedirectUri: 'https://magicform-a4cbe.firebaseapp.com',
  clientId:'mgfb-front'
};
