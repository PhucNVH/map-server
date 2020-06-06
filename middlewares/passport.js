var passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.createStrategy()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
