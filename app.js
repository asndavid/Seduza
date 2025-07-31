const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');

const app = express();
mongoose.connect('mongodb://localhost/seduza', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(3000, () => console.log('Seduza app listening on port 3000!'));