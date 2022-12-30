const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Forum = require('../models/forum');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Forum.getForumById(jwt_payload.data._id, (err, forum) => {
      if(err) {
        return done(err, false);
      }
      if(user) {
        return done(null, forum);
      } else {
        return done(null, false);
      }
    });
  }));
}