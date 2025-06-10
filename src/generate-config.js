const fs = require('fs');
const path = './src/environments/environment.prod.ts';

const content = `
export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.apiKey}",
    authDomain: "${process.env.authDomain}",
    databaseURL: "${process.env.databaseURL}",
    projectId: "${process.env.projectId}",
    storageBucket: "${process.env.storageBucket}",
    messagingSenderId: "${process.env.messagingSenderId}",
    appId: "${process.env.appId}",
    measurementId: "${process.env.measurementId}"
  }
};
`;

fs.writeFileSync(path, content);
console.log('✅ environment.prod.ts generated using dotenv');


// export const environment = {
//   production: true,
//   firebase: {
//     apiKey: "${process.env.API_KEY}",
//     authDomain: "${process.env.AUTH_DOMAIN}",
//     databaseURL: "${process.env.DATABASE_URL}",
//     projectId: "${process.env.PROJECT_ID}",
//     storageBucket: "${process.env.STORAGE_BUCKET}",
//     messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
//     appId: "${process.env.APP_ID}",
//     measurementId: "${process.env.MEASUREMENT_ID}"
//   }
// };