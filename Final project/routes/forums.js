const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Forum = require('../models/forum');

// POST
router.post('/forum', (req, res, next) => {
  let newForum = new Forum ({
    username: req.body.username,
    content: req.body.content
  });

  Forum.postForum(newForum, (err, forum) => {
    if(err) {
      res.json({success: false, msg: 'Failed to post'});
    } else{ 
      res.json({success: true, msg: 'Posted'});
    }
  });
});


// GET
router.get('/forum', (req, res, next) => {
  Forum.getForum((err, forum) =>
    res.json({forum: forum})
  )
});

module.exports = router;