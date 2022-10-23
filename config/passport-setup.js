/* const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

passport.use(new TwitterStrategy({
    consumerKey: process.env['TWITTER_API_KEY'],
    consumerSecret: process.env['TWITTER_API_SECRET'],
    callbackURL: 'http://www.example.com/oauth/callback/twitter'
  },
  function(token, tokenSecret, profile, done) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://twitter.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Twitter account has not logged in to this app before.  Create
        // new user record and link it to the Twitter account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }

          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://twitter.com',
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id.toString(),
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The Twitter account has previously logged in to the app.  Get the
        // user record linked to the Twitter account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    });
  }
));

app.get('/login/twitter', passport.authenticate('twitter'));







 */





/* 


Project name
passportAuth
Project number
524200830620
Project ID
passportauth-366410


*/