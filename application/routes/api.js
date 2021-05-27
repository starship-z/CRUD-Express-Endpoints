var express = require('express');
var router = express.Router();
// /api + "/ana"
/* GET home page. */
// localhost:3000/api/ana
const users = []

router.get('/register', function(req, res, next) {
//   res.send({status: true, name: "ana"})
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


router.post('/register', function(req, res, next) {
    // res.send({status: true, name: "ana"})
    let {username, password} =  req.body; 
    let User = {
        username: username, 
        password: password
    }
    users.push(User)
    res.send({status: true, User})
});

router.get("/viewUsers", (req, res, next) =>{
    res.send(users)
})

router.post('/auth', function(req, res, next) {
  let {username, password} = req.body;
  if(authenticateUser(username, password)) {
    //user authenticated
  }else {
    //user not autheticated
  }
  res.send({status: true, name: "ana"})
});

module.exports = router;