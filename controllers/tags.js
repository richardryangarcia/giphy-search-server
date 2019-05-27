const {addOrRemoveFromArray} = require('../utils/arrayUtils');
const Tag = require('../models/tag');

exports.updateTags = async (req, res, next) => {
  const {gifId, tag} = req.body;
  const tagArray = tag.split(',');
  const user = res.currentUser;

  try {
    let taggedGif;

    taggedGif = await Tag.findOne({
      userId: user._id,
      gifId
    });

    if(!taggedGif) {
      //create tag record
      taggedGif = new Tag({userId: user._id, gifId});
    }

    tagArray.forEach((t) => {
        taggedGif.tags = addOrRemoveFromArray(taggedGif.tags, t)
    });

    await taggedGif.save();// save update

    res.status(200).send({message: 'tags updated successfully'});
  } catch (e) {
    res.status(403).send({error: 'Failed to add tags'});
  }
}

exports.getTags = async (req, res, next) => {
  const user = res.currentUser;
  try {
    const tags = await Tag.find({userId: user._id}, 'gifId tags');
    res.status(200).send({ tags})
  } catch (e) {
    res.status(403).send({error: 'Failed to get user tags'});
  }
}
