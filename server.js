require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const quiz = require(__dirname + '/quiz.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin-aarya:Test-123@cluster0-tq3ny.mongodb.net/AspireDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  answers: [Number],
  marks: [mongoose.Decimal128]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/', function(req, res) {
  res.redirect('/sign-in');
});

app.get('/home', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('home');
  } else {
    res.redirect('/sign-in');
  }
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/sign-up', function(req, res) {
  res.render('sign-up');
});

app.get('/sign-in', function(req, res) {
  res.render('sign-in');
});

app.get("/sign-out", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get('/results', function(req, res) {
  User.findById(req.user._id, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        res.render('result', {marks: found.marks});
      }
    }
  });
});

app.get('/quiz', function(req, res) {
  User.findById(req.user._id, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        res.render('quiz', {
          user: found,
          quizTitle: "CPT",
          questions: quiz.questions,
          options: quiz.options
        });
      }
    }
  });
});

app.post('/sign-up', (req, res) => {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/home");
      });
    }
  });
});

app.post('/sign-in', (req, res) => {
  const user = new User({username: req.body.username, password: req.body.password});

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/home");
      });
    }
  });
});

app.post('/quiz', function(req, res) {
  const obj = quiz.score(req.body);
  console.log("Marks " + obj.marks);
  console.log("Answers " + obj.answers);

  User.findByIdAndUpdate(req.user._id, {
    marks: obj.marks,
    answers: obj.answers
  }, function(err, docs){
      if(err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.redirect('/results');
      }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function(req, res) {
  console.log('Server is running on port 3000.');
});
