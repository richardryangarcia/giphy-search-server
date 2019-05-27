const {trending, search, search_by_ids} = require('./controllers/giphy');
const {register, verifyAuthToken, getMongoUser} = require('./controllers/authentication');
const {getFavorites, updateFavorites} = require('./controllers/favorites');
const {getTags, updateTags} = require('./controllers/tags');


module.exports = (app) => {
  app.get('/', (req,res) => res.send({message: 'Server is serving!'}));

  //Giphy
  app.get('/api/v1/trending', trending);
  app.get('/api/v1/search', search);
  // app.get('/api/v1/search-by-ids', search_by_ids);

  // authenticatication
  app.post('/api/v1/register', register);

  //authorized endpoints
  app.get('/api/v1/get-favorites', verifyAuthToken, getMongoUser, getFavorites, search_by_ids);
  app.post('/api/v1/update-favorites', verifyAuthToken, getMongoUser, updateFavorites);

  app.post('/api/v1/update-tags', verifyAuthToken, getMongoUser, updateTags );
  app.get('/api/v1/get-tags', verifyAuthToken, getMongoUser, getTags );

}
