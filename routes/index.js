var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
const app = require('../app');
const connection = require('../config/databse')

//ALL CRUD OPERATIONS :-
// get method to redirect to the login page
router.get('/',(req,res)=>{
  res.redirect('create.html')
})

//
router.get('/getData',(req,res)=>{
  connection.query('select * from allcrudapi.loginpage',(error,result)=>{
    if(error){
      console.error(error)
    }
    else{
      res.render("read.ejs" ,{result})
    }
  })
})


// post method :- it sends all the data to the database whtever user fill
router.post('/data',(req,res)=>{
  console.log(req.body)
  const name = req.body.name
  const email = req.body.email

  connection.query('insert into allcrudapi.loginpage(name,email) values(?,?)',[name,email],(error,result)=>{
    if(error){
      console.error(error)

    }else{
      res.redirect('/getData')
    }
  })
})

// delete method for deleting the data by giving an ID
router.get('/delete-data',(req,res)=>{
  const sql = 'delete from  allcrudapi.loginpage where id=?'


  connection.query(sql,[req.query.id],(error,result)=>{
    if(error){
      console.error(error)

    }else{
      res.redirect('/getData')
    }
  })
})

// update method
router.get('/update-data',(req,res)=>{

  connection.query('select * from allcrudapi.loginpage where id=?',[req.query.id],(err,eachrow)=>{
    if(err){
      console.log(err)
    }else{
       resultss = JSON.parse(JSON.stringify(eachrow[0]))
       console.log(resultss)
      res.render('edit.ejs',{resultss} )
    }
  })
})

// final update
router.post('/final-update',(req,res)=>{
  console.log(req.body)
  const id = req.body.id
  const name = req.body.name
  const email = req.body.email

  console.log( 'id=',id)
  sql2 = 'update allcrudapi.loginpage set name=? ,email=?  where id=?'

  connection.query(sql2,[name,email,id],(error,result)=>{
    if(error){
      console.error(error)

    }else{
      res.redirect('/getData')
    }
  })
})

module.exports = router;
