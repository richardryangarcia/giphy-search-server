const axios = require('axios');
const giphy = require('../configs/giphy');

exports.trending = async (req, res, next) => {
  const {host, key} = giphy;

  try {
    const response = await axios.get(`${host}/v1/gifs/trending`, { params: { api_key: key }});
    const data = response.data;
    res.status(200).send(data);
  } catch(error){
    res.status(500).send({error: error})
  }
}

exports.search = async (req, res, next) => {
  const {host, key} = giphy;
  const query = req.query;

  try {
    const response = await axios.get(`${host}/v1/gifs/search`, { params: { api_key: key, q: query.q }});
    const data = response.data;
    res.status(200).send(data);
  } catch(error){
    res.status(500).send({error: error})
  }
}

exports.search_by_ids = async (req, res, next) => {
  const {host, key} = giphy;
  const {gifIds} = res;

  try {
    const response = await axios.get(`${host}/v1/gifs`, { params: { api_key: key, ids: gifIds.join(",")}});
    const data = response.data;
    res.status(200).send({favorites: gifIds, gifs: response.data});
  } catch(error){
    res.status(500).send({error: error})
  }
}
