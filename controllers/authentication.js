const axios = require('axios');
const admin = require('firebase-admin');
const adminCredentials = require('../configs/firebase.json');
const firebaseUtils = require('../utils/firebase');
const User = require('../models/user');

admin.initializeApp({
  credential: admin.credential.cert(adminCredentials),
  databaseURL: process.env.FIREBASE_URL
});

exports.register = (req, res, next) => {
  const {uid, firstName, lastName, email} = req.body;
  User.findOne({_id: uid}, (error, user) => {

    //error checking for mongo user record
    if (error) return next(error);

    //return if user already exists in mongodb
    if (user) return res.status(400).send({message: "User already exists"});

    // if user does not exist, create new record
    const newUser = new User({_id: uid, firstName, lastName, email});

    //save newly created user record to mongodb
    newUser.save((error) => {
      if (error) return next(error);

      //respond OK if user created successfully
      res.status(200).send({message: 'User successfully created'});
    });
  });
}

exports.register_old = async (req, res, next) => {
  const {firstName, lastName, email} = req.body;
  try {
     const uid = await firebaseUtils.getFirebaseUserId(req, res, admin);
     User.findOne({_id: uid}, (error, user) => {

       //error checking for mongo user record
       if (error) return next(error);

       //return if user already exists in mongodb
       if (user) return res.status(400).send({message: "User already exists"});

       // if user does not exist, create new record
       const newUser = new User({_id: uid, firstName, lastName, email});

       //save newly created user record to mongodb
       newUser.save((error) => {
         if (error) return next(error);

         //respond OK if user created successfully
         res.status(200).send();
       });
     });

  } catch (error) {
      res.status(400).send({message: "User could not be created"})
  }

}
