module.exports = (app) => {
  app.get('/', (req,res) => {
    res.send({message: 'Server is serving!'})
  });
}
