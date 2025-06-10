export const environment = {
  production: true,
  firebase: {
    apiKey: (window as any).env.apiKey,
    authDomain: (window as any).env.authDomain,
    databaseURL: (window as any)["databaseURL"],
    projectId: (window as any)["projectId"],
    storageBucket: (window as any)["storageBucket"],
    messagingSenderId: (window as any)["messagingSenderId"],
    appId: (window as any)["appId"],
    measurementId: (window as any)["measurementId"]

  }
};