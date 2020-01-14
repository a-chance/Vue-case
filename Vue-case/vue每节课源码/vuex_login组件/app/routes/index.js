var express = require('express');
var router = express.Router();
const Users = require('../schema/user');

/* GET home page. */
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findOne({
    username,
    password,
  }).then(user=>{ //如果找到该用户  则登录成功
    if(user){
      res.send({
        code:1,
        userInfo:user,
      })
    }else{
      res.send({
        code:0
      })
    }
  })
})


router.post('/register', (req, res) => {
  
  let { username, password } = req.body;
  Users.findOne({
    username,
  }).then(user => {
    console.log(user);
    if (!user) { //如果没有找到该用户  则用户注册成功
      new Users({
        username,
        password,
        age:~~(Math.random()*20+20)
      }).save().then(()=>{
        res.send({ code: 1})
      })
    } else { //如果找到该用户  则用户注册失败
      res.send({ code: 0})
    }

  })
})


router.get('/userlist', function(req, res, next) {
  Users.find().then(users=>{
    res.send(users)
  })
});

module.exports = router;
