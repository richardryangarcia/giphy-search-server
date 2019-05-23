const Giphy = require('./controllers/giphy');
const Authentication = require('./controllers/authentication');

module.exports = (app) => {
  app.get('/', (req,res) => {
    res.send({message: 'Server is serving!'})
  });

  app.get('/api/v1/trending', Giphy.trending);
  app.get('/api/v1/search', Giphy.search);
  app.get('/api/v1/search-by-ids', Giphy.search_by_ids);

  app.post('/api/v1/register', Authentication.register);

  //authorized endpoints
  app.get('/api/v1/get-favorites', Authentication.verifyAuthToken, Authentication.getFavorites, Giphy.search_by_ids);
  app.post('/api/v1/update-favorites', Authentication.verifyAuthToken, Authentication.updateFavorites);

}
