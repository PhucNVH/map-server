const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  expressSession({
    secret: 'keyboardhero',

    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://3P1N:wHRSL5QyXLlVkXfH@cluster0-ehqku.azure.mongodb.net/dadn-map?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('OK');
  })
  .catch((e) => {
    console.log(e);
  });

app.set('view engine', 'ejs');
app.use(require('./controllers'));
var port = process.env.PORT || 1337;
app.listen(port, () => console.log('Gator app listening!'));
