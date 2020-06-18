var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel');
const BookmarkModel = require('../models/BookmarkModel');

// get all boommarks by user id
router.get('/:id', async function(req, res, next) {
  const user_id = req.params.id;
  console.log(user_id, 'dhaskjdskjakda')
  // const user = await UserModel.findOne({'_id': user_id.toStri});
  // if (!user) {
  //   return res.status(400).json({error_type: 'user'});
  // }
  const bookmarks = await BookmarkModel.find({'user__id': user_id})
  res.json(bookmarks)
});

// add bookmark
router.post('/', async function(req, res, next) {
  const {user__id, sid} = req.body;
  console.log(req.body)
  const newBookmark = new BookmarkModel({ user__id, sid });
  await newBookmark.save()
  res.send('saved')
});

// delete bookmark by bookmark id
router.delete('/:id', async function(req, res, next) {
  await BookmarkModel.deleteOne({'_id': req.params.id});
});

module.exports = router;
