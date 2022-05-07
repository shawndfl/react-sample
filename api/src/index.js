const express = require('express')
const app = express()

// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const username = req.query.user
  var data ={
    user: username== undefined?"": username,
    email: "me@gmail.com",
    phone: "555-555-5555"
  }  
  res.send(data);
})

app.listen(4000,()=>{
    console.log("Server listening on port : 4000")
})