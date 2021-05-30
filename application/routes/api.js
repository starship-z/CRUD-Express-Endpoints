const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// /api + "/ana"
/* GET home page. */
// localhost:3000/api/ana
const users = [];
const loggedIn = [];
/*
block of commentws for a push
*/
router.get('/register', function(req, res, next) {
//res.send({status: true, name: "ana"})
  res.send("hello")

//application/json
//application/html
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
    password = await bcrypt.hash(password, 15); 
    let User = {
        // username: username, 
        // password: password
        username,
        password
    }
    users.push(User)
    res.send({status: true, User})
});

router.get("/viewUsers", (req, res, next) =>{
    res.send(users)
})

function getUser(username){
  let output = users.find(user =>user.username === username);
  if (output){return output};
  return NULL;
}

async function authenticateUser(username, password){
  let user = getUser(username);
  if(user){
    return await bcrypt.compare(password, user.password);
  }
}

router.post('/login', async function(req, res, next) {
  let {username, password} = req.body;
  try{
    if(await authenticateUser(username, password)) {
      let user = getUser(username);
      loggedIn.push(user);
      res.send({status: true, user: user});
    }else {
      res.send({status: false})
    }
  }catch(err){
    console.log(err);
    res.send({status: false});
  }
});

router.get("/viewLoggedIn", (req, res, next) =>{
  res.send(loggedIn);
})

module.exports = router;