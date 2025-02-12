const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(new LocalStrategy(
  async(username, password, done) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1',[username]);
    const user = result.rows[0];

    if (!user) { return done(null, false, {message: 'incorrect username'}); }

    const isValid = await bcrypt.compare(password,user.passport);
    if (!isValid) { return done(null, false, {message: 'incorrect password'}); }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      done(null, result.rows[0]);
  } catch (err) {
      done(err);
  }
});

module.exports = passport;
