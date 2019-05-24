const {addOrRemoveFromArray} = require('../utils/arrayUtils');

exports.getFavorites = (req, res, next) => {
    const user = res.currentUser;
    const {favorites} = user;

    res.gifIds = favorites;
    return next();
}

exports.updateFavorites = async (req, res, next) => {
    const {gif_id} = req.body;
    const user = res.currentUser;
    const {favorites} = user

    try {
      user.favorites = addOrRemoveFromArray(favorites, gif_id);
      await user.save();

      res.status(200).send({ favorites: user.favorites})
    } catch (e) {
      res.status(403).send({ error: 'failed to update favorites' });
    }
}
