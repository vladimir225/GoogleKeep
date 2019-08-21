var express = require('express');
var bodyparser =require('body-parser');
const port = 4444;
const app = express();
var cors = require('cors')
const Sequelize = require('sequelize')
const bd = new Sequelize('mysql://root:New_password1@localhost:3306/new_database');

app.use(cors());
app.use(bodyparser());


const Title = bd.define('title', {
  title: bd.Sequelize.STRING
 })

 const User = bd.define('user', {
  user: bd.Sequelize.STRING,
  password: bd.Sequelize.STRING 
 })

 const Login = bd.define('login', {
   user: bd.Sequelize.STRING
 })
 
 Title.belongsTo(User)

app.get('/', function (req, res) {
  console.log(req.query);
    res.send('Hello World!');
  });

  app.post('/post/:id/:name', function (req, res) {
      console.log(req.params);
    res.status(404).send('Hello World with params!');
  });


  app.post('/post', function (req, res) {
    console.log(req.params);

  res.status(404).send({a: 'a'});
});

  app.put('/put', function (req, res) {
    console.log(req.body);
  res.status(404).send('Hello World2!');
});

  app.delete('/dlt', function(req, res) {
    res.send('hi')
  })
let db= [];
  app.post('/keep', (req, res) => {
    console.log(req.body)
    const collection = Login.findAll({raw: true})
    .then((r) => {
      console.log(r.length)
      db.push(req.body)
      res.json(req.body)
      bd.sync().then(() => {
      Title.create({title: req.body.title, userId:r[r.length-1].user})
      })
    })
  })

  app.post('/registr', (req, res) => {
    console.log(req.body,'-----------------')
    db.push(req.body)
    /*const collection = User.findAll({raw: true})
    .then((c) => {
      if (!/\s/g.test(req.body.user) && req.body.password.length > 7) {
        return c
      } 
    })
    .then((c) => c.some(val => val.user === req.body.user))
    .then((r)=>{
      if (r === false) {
        bd.sync().then(() => {  
          User.create(req.body)
        })
        res.redirect('http://localhost:3000')
      } else {
        throw Error
      }
    })
    .catch((e) => {
      res.redirect('http://localhost:3000/registr')
    })
    */
    
    const searchUser = User.findOne({raw:true, where:req.body})
    .then((user) => {
      if(!user) {
        console.log(user,'=====', 1)
        bd.sync().then(() => {
          User.create(req.body)
        })
        res.redirect('http://localhost:3000/')
      } else {
        throw new Error('Логин занят')
      }
    })
    .catch(() => {
      console.log('попали в кетчь')
      //res.status(400).send({message: err.message})      ///////////////
    })
  })

  app.post('/login', (req, res) => {
    console.log(req.body, '-----')
    const collection = User.findOne({raw: true, where: {user:req.body.user, password: req.body.password}})
    .then((user) => {
      if (user) {
        //res.redirect('http://localhost:3000')
        console.log(user,'=====')
        bd.sync({}).then(() => {  
          Login.create({user:user.id})
        })
        res.send(user)
      } else {
        throw new Error('не верно введенные данные')
      }
    })
    .catch((err) => {
      res.status(400).send({message: err.message})
      console.log(err)
      //res.redirect('http://localhost:3000/login')
    })
  })

  app.get('/keeps', (req, res) => {
    //res.json(db)
    const loginDb = Login.findAll({raw:true})
    .then((r)=>{
      console.log(r[r.length-1].user)
    
      const collection = Title.findAll({raw: true, where: {userId:r[r.length-1].user}})
      .then((c) =>{
        res.json(c)
      })
    })

  })
  


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    
  });

