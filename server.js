const express = require('express');
const ejs = require('ejs');
const quiz = require(__dirname + '/quiz.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/AspireDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  answers: [Number],
  marks: [mongoose.Decimal128]
});

app.get('/', function(req, res){
    res.redirect('/sign-in');
});

app.get('/home/:uid', function(req, res){
    User.findOne({'_id': req.params.uid}, function(err, found){
        if(err) {
          res.send('Error');
        } else if (found) {
          res.render('home', {user: found});
        }
    });
});

app.get('/sign-up', function(req, res){
  res.render('sign-up');
});

app.get('/sign-in', function(req, res){
  res.render('sign-in');
});

app.get('/:uid', function(req, res) {
  const uid = req.params.uid;

  User.findOne({
    '_id': uid
  }, (err, found) => {
    if (err) {
      console.log(err);
    } else if (found) {
      res.render('result', {marks: found.marks});
    }
  });
});

app.get('/quiz/:uid', function(req, res) {
  const uid = req.params.uid;
  User.findOne({
    '_id': uid
  }, (err, found) => {
    if (err) {
      console.log(err);
    } else if (found) {
      res.render('quiz', {
        user: found,
        quizTitle: "CPT",
        questions: quiz.questions,
        options: quiz.options
      });
    }
  });
});

app.post('/sign-up', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    marks: [],
    answers: []
  });
  console.log(user);
  user.save();
  res.send('Success!');
});

app.post('/sign-in', (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  User.findOne({
    email: email,
  }, (e, f) => {
    if (e) {
      res.send('Failure!');
    } else {
      console.log(f);
      if(f && f.password === password) {
        console.log('Success!');
        res.render('home', {user: f});
      }
      else {
        res.send('incorrect username or password');
      }
    }
  });
});

app.post('/quiz/:uid', function(req, res) {
  const uid = req.params.uid;
  const obj = quiz.score(req.body);
  const marks = obj.marks;
  const answers = obj.answers;

  console.log("Marks: " + marks);
  console.log("Answers: " + answers);

  User.updateOne({
    '_id': uid
  }, {
    marks: marks,
    answers: answers
  }, function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/" + uid);
    }
  });
});

app.listen(3000, function(req, res) {
  console.log('Server is running on port 3000.');
});
