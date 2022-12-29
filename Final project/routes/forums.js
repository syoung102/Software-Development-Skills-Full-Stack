const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Forum = require('../models/forum');

// POST
router.post('/post', (req, res, next) => {
  let newForum = new Forum ({
    username: req.body.username,
    content: req.body.content
  });

  Forum.postForum(newForum, (err, forum) => {
    res.json({success: true, msg: 'Posted'});
  });
});

module.exports = router;