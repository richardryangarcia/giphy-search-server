exports.getFirebaseUserId = async (req, res, admin) => {
  //grab auth token from request header
  const authToken = req.get('Authorization');
  if (!authToken || typeof authToken != 'string'){
    res.status(403).send({error: 'forbidden'});
  }

  //verify token is valid firebase token
  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    return decodedToken.uid;
  } catch (error) {
    console.log(error);
    res.status(403).send({error: 'forbidden'});
  }
}
