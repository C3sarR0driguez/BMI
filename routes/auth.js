var express = require('express');
var router = express.Router();
const User = require('../models/user');
const auth = require('../auth');

/*Auth signup */
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let hashedPassword = '';
  if (!username || !password) {
    return res.status(400).send('Expecting params @username and @password');
  }
  if (!username || (username && username.length < 5)) {
    return res.status(400).send('User is not valid');
  }
  if (!password || !auth.isPasswordValid(password)) {
    return res.status(400).send('Password is not valid');
  }
  hashedPassword = auth.hashPassword(password);
  User.findOne({
    username
  }).then((user) => {
    if (user) {
      return res.status(400).send('Username already exists');
    }
    const newUser = new User({
      username,
      password: hashedPassword
    });
    return newUser.save().then(() => {
      const token = auth.createJWTToken({
        id: newUser._id,
        username: newUser.username
      });
      res.send(200, {
        auth: true,
        token
      });
    })
  }).catch(e => {
    res.status(500).send(e.toString());
  })
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let hashedPassword = '';
  if (!username || !password) {
    return res.status(400).send('Expecting params @username and @password');
  }
  hashedPassword = auth.hashPassword(password);
  User.findOne({
    username,
    password: hashedPassword
  }).then((user) => {
    if (!user) {
      console.log('not exists');
      return res.status(400).send('User does not exists,are you new? try to signup first');
    }
    const token = auth.createJWTToken({
      id: user._id,
      username: user.username
    });
    res.send(200, {
      auth: true,
      token
    })
  }).catch(e => {
    res.status(500).send(e.toString());
  })
});




module.exports = router;