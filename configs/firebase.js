const admin = require('firebase-admin');
const adminCredentials = require('../constants/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(adminCredentials),
  databaseURL: process.env.FIREBASE_URL
});

module.exports = admin;
