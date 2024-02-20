const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv').config();
const passportConfig = require('./config/passport');

const app = express();

app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: process.env.PASSPORT_SESSION }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
