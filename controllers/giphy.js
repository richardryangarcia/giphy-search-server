const axios = require('axios');
const giphy = require('../configs/giphy');

exports.trending = async (req, res, next) => {
  let response;
  try {
    response = await axios.get(`${giphy.host}/v1/gifs/trending`, { params: { api_key: giphy.key }});
    const data = response.data;
    res.status(200).send({data});
  } catch(error){
    res.status(500).send({error: error})
  }
}

exports.search = async (req, res, next) => {
  let response;
  const query = req.query;
  const {host, key} = giphy;

  try {
    response = await axios.get(`${host}/v1/gifs/search`, { params: { api_key: key, q: query.q }});
    const data = response.data;
    res.status(200).send({data});
  } catch(error){
    res.status(500).send({error: error})
  }
}

exports.search_by_ids = async (req, res, next) => {
  const {host, key} = giphy;
  const query = req.query;
  let response;

  try {
    response = await axios.get(`${host}/v1/gifs`, { params: { api_key: key, ids: query.ids}});
    const data = response.data;
    res.status(200).send({data});
  } catch(error){
    res.status(500).send({error: error})
  }
}
