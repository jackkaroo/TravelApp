const mongoose = require('mongoose');


const BookmarkModelSchema = mongoose.Schema(
  {
    user__id: {
      type: String,
      required: true
    },
    sid: {
      type: String,
      required: true
    }
});


module.exports = mongoose.model('BookmarkModel', BookmarkModelSchema);