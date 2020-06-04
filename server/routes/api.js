const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const events = require('../events');


require('dotenv').config();
const db = process.env.MONGODB_URI;
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
  console.log('Connected to DB');
  // console.log(process.env.MONGODB_URI);
})
.catch((err)=>{
  console.log(`there is a problem with: ${err.message}`);
  process.exit(-1)
})

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}


router.get('/', (req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => console.log(err))
})

router.post('/register', (req, res) => {
  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // })
  let userData = req.body;
  const user = new User(userData);

  // user.save((err, registeredUser)=> {
  //   if(err){
  //     console.log(err);
  //   } else {
  //     res.status(200).send(registeredUser)
  //   }
  // })
  user.save()
  .then(registeredUser => {
    let payload = {subject: registeredUser._id};
    let token = jwt.sign(payload, 'secretKey');
    // res.json(registeredUser)
    res.json({token})
  })
  .catch(err => res.json({message: err}))
})

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({email: userData.email})
  .then(user => { console.log(user);
  
    if(!user) {
      res.status(401).send('Invalid email')
    } 
    else if (user.password !== userData.password) {
      res.status(401).send('Invalid password')
    } 
    else {
      // res.status(200).send(user);
      let payload = {subject: user._id};
      let token = jwt.sign(payload, 'secretKey')
      // res.json(user)
      res.json({token})

    }
  })
  .catch(err => console.log(err))
})

router.get('/events', (req, res) => {
  let specialEvents = events
  res.json(specialEvents)
})
router.get('/special', verifyToken, (req, res) => {
  res.json(specialEvents)
})


module.exports = router;