const process = require('node:process');
const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const router = express.Router();

require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/oauth2/redirect/google',
    },
    (issuer, profile, callback) => {
      console.info('TEST', issuer, profile, callback);
    },
  ),
);

router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/redirect/google', passport.authenticate('google', {
  failureRedirect: '/login',
}));

module.exports = router;
