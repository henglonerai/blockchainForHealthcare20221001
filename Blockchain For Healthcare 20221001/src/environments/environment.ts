// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const IPFS = {
  // localIPFS: 'http://127.0.0.1:5001/api/v0',
  // localIPFSGet: 'http://localhost:8080/ipfs/'

  /*localIPFS: 'https://k0lsbvt33u-k0zt24yesd-ipfs.kr0-aws.kaleido.io/api/v0',
  localIPFSGet: 'http://localhost:8080/ipfs/',
  userID: 'k0vr6zqfvs',
  key: 'qMprzA7K04sAV-Mum-UqjEHFIzwyZs_WPtQPwzu9_ig'*/
  
  localIPFS: 'https://ipfs.infura.io:5001/api/v0',
  localIPFSGet: 'http://localhost:8080/ipfs/',
  userID: '2GGQMjvAXPhoPiJ6w3wQ57vNVik',
  key: 'a0e263e94511a0357faf1d6a17eee177'

  /* host: 'k0lsbvt33u-k0zt24yesd-ipfs.kr0-aws.kaleido.io',
  port: 5001,
  protocol: 'https'*/
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
