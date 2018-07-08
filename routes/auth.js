var express = require('express');
var router = express.Router();
const User = require('../models/user');
const auth = require('../auth');

/*Auth signup */
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let hashedPassword = '';
  if(!username || !password){
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
    console.log('hi');
    if (user) {
      return res.status(400).send('Username already exists');
    }
    const newUser = new User({
      username,
      password: hashedPassword
    });
    return newUser.save().then(() => {
      console.log(auth);
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




module.exports = router;