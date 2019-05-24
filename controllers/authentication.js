const admin = require('../configs/firebase');
const User = require('../models/user');


exports.verifyAuthToken = async (req, res, next) => {
  //get auth token from header
  const authToken = req.get('Authorization');

  if (!authToken || typeof authToken != 'string'){
    res.status(403).send({ error: 'Forbidden.' });
  }

  try {
    //verify firebase id token
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    if (decodedToken && decodedToken.uid) {
      res.currentUser = {
        _id: decodedToken.uid
      }
    } else {
      res.status(403).send({ error: 'Forbidden.' });
    }

    return next();

  } catch(e) {
    res.status(403).send({ error: 'Forbidden.' });
  }
}

exports.verifyMongoUser = async (req, res, next) => {
  //look up User record in Mongo
  try {
    const user = await User.findOne({_id: res.currentUser._id});
    if (!user) {
      res.status(403).send({ error: 'Mongo User record does not exist' });
    } else {
      res.currentUser = user;
      next()
    }
  } catch (e) {
    res.status(403).send({ error: 'Error retrieving mongo user record' });
  }
}

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
