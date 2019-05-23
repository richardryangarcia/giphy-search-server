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

exports.verifyAuthToken = async (req, res, next) => {
  //get auth token from header
  const authToken = req.get('Authorization');

  if (!authToken || typeof authToken != 'string'){
    res.status(403).send({ error: 'Forbidden.' });
  }

  try {
    //verify firebase id token
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    //mongo user does not exist
    // if (!decodedToken.name) return res.status(403).send({ error: 'Forbidden.'});

    //all good, proceed
    res.currentUserUid = decodedToken && decodedToken.uid;
    return next();

  } catch(e) {
    console.log('decode error')
    res.status(403).send({ error: 'Forbidden.' });
  }
}

exports.getFavorites = async (req, res, next) => {
  //look up User record in Mongo
  const user = await User.findOne({_id: res.currentUserUid});

  if (user) {
    //get current favorites
    const {favorites} = user;

    res.gifIds = favorites;
    return next();

    // const favoriteGifObjects = await Giphy.search_by_ids(req,res, next)
    // res.status(200).send({favorites});
  } else {
    res.status(403).send({ error: 'User not found' });
  }
}

exports.updateFavorites = async (req, res, next) => {
  const {gif_id} = req.body;
  //look up User record in Mongo
  const user = await User.findOne({_id: res.currentUserUid});
  if (user) {
    //create gif instance

    //get current favorites
    const {favorites} = user;
    let newFavs;

    //check if gif is already in favorites
    if (favorites.includes(gif_id)){

      newFavs = favorites.filter((value) => { // remove from favorites
        return value != gif_id;
      });

    } else{
      //add to favorites
      newFavs = [...favorites, gif_id]; //add to favorites
    }

    //update user favorites and save
    user.favorites = [...newFavs];
    await user.save();


    res.status(200).send({ favorites: user.favorites})
  } else {
    res.status(403).send({ error: 'User not found' });
  }
}
