const mongoose = require('mongoose');


const bookmarkSchema = mongoose.Schema(
  {
    user__id: {
      type: String,
      required: true
    },
    seed: {
      type: String,
      required: true
    }
});


module.exports = mongoose.model('Bookmark', bookmarkSchema);