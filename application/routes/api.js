const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// /api + "/ana"
/* GET home page. */
// localhost:3000/api/ana

// necessary arrays
let users = [];
let loggedIn = [];

/*
router.get('/register', function(req, res, next) {
 //res.send({status: true, name: "ana"})
  return res.send("hello")

  //application/html
  //application/json
  //application/css
});
*/ 

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

// register a user with a username and password
router.post('/register', async function(req, res, next) {
    // res.send({status: true, name: "ana"})
    let {username, password} =  req.body;
    if(userExists(username)) return res.send({status: false}); // check if user exists then cannot register
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

// view all registered users
router.get("/viewUsers", (req, res, next) =>{
  return res.send(users)
})

// get user by username
function getUser(username){
  let output = users.find(user =>user.username === username);
  if (output){return output};
  return NULL;
}

// check if user exists by username
function userExists(username){
  let output = users.find(user =>user.username === username);
  if (output){return true};
  return false;
}

// check if logged in user exists
function loggedInUserExists(username){
  let output = loggedIn.find(user =>user.username === username);
  if (output){return true};
  return false;
}

// login in
async function authenticateUser(username, password){
  let user = getUser(username);
  if(user){
    return await bcrypt.compare(password, user.password);
  }
}

// login in a user
router.post('/login', async function(req, res, next) {
  let {username, password} = req.body;
  if(loggedInUserExists(username)) return res.send({status: false}); // check if user is already logged in

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

// log user out
router.post('/logout', async function(req, res, next) {
  let {username} = req.body;
  if(!loggedInUserExists(username)) return res.send({status: false});

  try{
    
    logout(username);
    return res.send({status: true, user: username});
    
    // user: function parameter
    // => arrow to function 
    // {return user.username != username}
    // user => 
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

// log out function to not repeat code
function logout(username){
  loggedIn = loggedIn.filter(user => {return user.username != username});
}

// delete function to not repeat code
function deleteUser(username){
  users = users.filter(user => {return user.username != username});
}

// delete a user
router.post('/delete', async function(req, res, next) {
  let {username} = req.body;
  if(!userExists(username)) return res.send({status: false});

  try{
    
    if(loggedInUserExists(username)) logout(username);
    deleteUser(username);
    return res.send({status: true, user: username});
    
    // user: function parameter
    // => arrow to function 
    // {return user.username != username}
    // user => 
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

// view all logged in users
router.get("/viewLoggedIn", (req, res, next) =>{
  res.send(loggedIn);
})

module.exports = router;