const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Users = require('./schema/users');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
app.use('/login',(req,res)=>{
  let {username,password} = req.body
  Users.findOne({
    username,
    password
  }).then(user=>{
    if(user){ //如果用户存在  则登录成功 返回0
      res.send({
        errno:0
      })
    }else{
      res.send({  //用户不存在 登录失败 返回1
        errno:1
      })
    }
  })

});

app.use('/register',(req,res)=>{
  let {username,password} = req.body
  console.log(username,password)
  Users.findOne({
    username,
  }).then(user=>{
    if(user){ //如果找到该用户  则用户已经注册过了  不可注册  返回1
      res.send({
        errno:1
      })
    }else{  //如果没找到该用户  则用户没有注册过  可以注册  返回0
      res.send({
        errno:0
      })

      new Users({ //保存该用户
        username,
        password,
        age:~~(Math.random()*20)+20
      }).save()
    }
  })
});

app.get('/userlist',(req,res)=>{
  console.log(2);
  Users.find().then(users=>{
    res.send(users)
  })
})

mongoose.connect('mongodb://localhost:27018/vuex',{useNewUrlParser: true},(err)=>{
  if (err) {
    console.log('数据库链接失败')
    return
  }
  app.listen(5000,()=>{
    console.log('5000端口成功监听')
  })
  console.log('数据库链接成功')
})
