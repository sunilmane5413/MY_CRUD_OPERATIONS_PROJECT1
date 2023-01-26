var mysql = require('mysql2')

// database connection 
const connection = mysql.createConnection({
    port:3306,
    host:'localhost',
    user:'root',
    password:'Pass@5413',
    database:'ALLCRUDAPI'
})

connection.connect((error)=>{
  if(error){
    console.error(error);
  }else{
    console.log('conected to the database "allcrudapi"')
  }
})


module.exports = connection;