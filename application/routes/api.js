const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// /api + "/ana"
/* GET home page. */
// localhost:3000/api/ana
const users = [];
let loggedIn = [];

router.get('/register', function(req, res, next) {
  //res.send({status: true, name: "ana"})
  return res.send("hello")

  //application/html
  //application/json
  //application/css
});

// get -> see data
// post -> change data
/*
MIME TYPES: 
application/php
application/json
application/text
application/html
application/image
application/css
application/js
*/

router.post('/register', async function(req, res, next) {
    // res.send({status: true, name: "ana"})
    let {username, password} =  req.body;
    if(userExists(username)) return res.send({status: false});
    password = await bcrypt.hash(password, 15); 
    
    let User = {
        // username: username, 
        // password: password
        username,
        password
    }
    users.push(User)
    
    return res.send({status: true, User})
});

router.get("/viewUsers", (req, res, next) =>{
  return res.send(users)
})

function getUser(username){
  let output = users.find(user =>user.username === username);
  if (output){return output};
  return NULL;
}

function userExists(username){
  let output = users.find(user =>user.username === username);
  if (output){return true};
  return false;
}

function loggedInUserExists(username){
  let output = loggedIn.find(user =>user.username === username);
  if (output){return true};
  return false;
}

async function authenticateUser(username, password){
  let user = getUser(username);
  if(user){
    return await bcrypt.compare(password, user.password);
  }
}

router.post('/login', async function(req, res, next) {
  let {username, password} = req.body;
  if(loggedInUserExists(username)) return res.send({status: false});

  try{
    if(await authenticateUser(username, password)) {
      let user = getUser(username);
      loggedIn.push(user);
      return res.send({status: true, user: user});
    }else {
      return res.send({status: false})
    }
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

router.post('/logout', async function(req, res, next) {
  let {username} = req.body;
  if(!loggedInUserExists(username)) return res.send({status: false});

  try{
    // 
    // user: function parameter
    // => arrow to function 
    // {return user.username != username}
    // user => 
    
    loggedIn = loggedIn.filter(user => {return user.username != username});
    return res.send({status: true, user: username});
    
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

router.get("/viewLoggedIn", (req, res, next) =>{
  res.send(loggedIn);
})

module.exports = router;