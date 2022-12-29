// Interaction with database
const mongoose = require('mongoose');
const config = require('../config/database');

// Forum Scehma
const ForumSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true
    }
});

const Forum = module.exports = mongoose.model('Forum', ForumSchema);

module.exports.getForumById = function(id, callback) {
  Forum.findById(id, callback);
}

module.exports.getForumByUsername = function(username, callback) {
  const query = {username: username}
  Forum.findOne(query, callback);
}

module.exports.postForum = function(newForum, callback) {
  newForum.save(callback);
}