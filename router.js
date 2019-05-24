const {trending, search, search_by_ids} = require('./controllers/giphy');
const {register, verifyAuthToken, verifyMongoUser} = require('./controllers/authentication');
const {getFavorites, updateFavorites} = require('./controllers/favorites');
const {getTags, addTags} = require('./controllers/tags');


module.exports = (app) => {
  app.get('/', (req,res) => res.send({message: 'Server is serving!'}));

  //Giphy
  app.get('/api/v1/trending', trending);
  app.get('/api/v1/search', search);
  app.get('/api/v1/search-by-ids', search_by_ids);

  // authenticatication
  app.post('/api/v1/register', register);

  //authorized endpoints
  app.get('/api/v1/get-favorites', verifyAuthToken, verifyMongoUser, getFavorites, search_by_ids);
  app.post('/api/v1/update-favorites', verifyAuthToken, verifyMongoUser, updateFavorites);

  app.post('/api/v1/add-tags', verifyAuthToken,verifyMongoUser, addTags );
  app.get('/api/v1/get-tags', verifyAuthToken,verifyMongoUser, getTags );

}
