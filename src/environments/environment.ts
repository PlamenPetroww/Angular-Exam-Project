
export const environment = {
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'],
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
    databaseURL:
      'https://test-angular-e21b5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'test-angular-e21b5',
    storageBucket: 'test-angular-e21b5.appspot.com',
    messagingSenderId: '577584796191',
    appId: '1:577584796191:web:751a492f030f4b177cfb2a',
  },
  production: true,
  appUrl:
    'https://test-angular-e21b5-default-rtdb.europe-west1.firebasedatabase.app/',
};
