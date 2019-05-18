const Giphy = require('./controllers/giphy');

module.exports = (app) => {
  app.get('/', (req,res) => {
    res.send({message: 'Server is serving!'})
  });

  app.get('/api/v1/trending', Giphy.trending);
  app.get('/api/v1/search', Giphy.search);
  app.get('/api/v1/search-by-ids', Giphy.search_by_ids);

}
