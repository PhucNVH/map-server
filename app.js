const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// firebase initialize
var admin = require('firebase-admin');
var serviceAccount = require('./config/ttcnpm-map-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ttcnpm-map.firebaseio.com',
});

var mongoose = require('mongoose');
mongoose.connect(
  'mongodb://heroku_5xp0r0k1:5uje47hk0p5ggshirm89pl81do@ds043917.mlab.com:43917/heroku_5xp0r0k1',
);

app.set('view engine', 'ejs');
app.use(require('./controllers'));
app.listen(3000, () => console.log('Gator app listening on port 3000!'));
