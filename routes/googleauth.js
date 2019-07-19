// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const http = require('http');
// const url = require('url');
// const opn = require('open');
// const destroyer = require('server-destroy');

// const {google} = require('googleapis');
// const plus = google.plus('v1');

// /**
//  * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
//  */
// const keyPath = path.join(__dirname, 'oauth2.keys.json');
// let keys = {redirect_uris: ['http://localhost:3000']};
// if (fs.existsSync(keyPath)) {
//   keys = require(keyPath).web;
// }

// /**
//  * Create a new OAuth2 client with the configured keys.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   keys.redirect_uris[0]
// );

// /**
//  * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
//  */
// google.options({auth: oauth2Client});

// /**
//  * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
//  */

// async function authenticate(scopes) {
//   return new Promise((resolve, reject) => {
//     // grab the url that will be used for authorization
//     const authorizeUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: scopes.join(' '),
//     });
//   });
// }

// async function runSample() {
//   // retrieve user profile
//   const res = await plus.people.get({userId: 'me'});
//   console.log(res.data);
// }

// const scopes = ['https://www.googleapis.com/auth/plus.me'];
// authenticate(scopes)
//   .then(client => runSample(client))
//   .catch(console.error);

// module.exports = {authenticate: authenticate};