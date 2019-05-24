const {addOrRemoveFromArray} = require('../utils/arrayUtils');
const Tag = require('../models/tag');

exports.addTags = async (req, res, next) => {
  const {gifId, tags} = req.body;
  const tagArray = tags.split(",");
  const user = res.currentUser;

  try {

    tagArray.forEach( async (title) => {
        let tag;

        //check if tag exists for user
        tag = await Tag.findOne({
          userUid: user._id,
          title
        });

        if (!tag) {
          //create tag record
          tag = new Tag({userUid: user._id, title});
        }

        tag.gifs = addOrRemoveFromArray(tag.gifs, gifId);//update tag record

        await tag.save();// save update
    })

    res.status(200).send({message: 'tags updated successfully'});
  } catch (e) {
    res.status(403).send({error: 'Failed to add tags'});
  }
}

exports.getTags = async (req, res, next) => {
  const user = res.currentUser;
  try {
    const tags = await Tag.find({userId: user._id});
    res.status(200).send({ tags})
  } catch (e) {
    res.status(403).send({error: 'Failed to get user tags'});
  }
}
