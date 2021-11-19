const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Name = require("./model/name")
const nameList = require("./data")


server.use(bodyParser.json());
server.use(cors());

const port = 3000;

const nameRoutes = require("./controllers/names");
server.use('/names', nameRoutes);

server.get('/', (req, res) => {
    res.send("This is the Homepage");
});

server.get('/names/:id', (req, res) => {
    try{
      res.send(nameList[req.params.id-1])
    }catch(err){
      console.log(err)
    }
  })

  server.listen(port, ()=>{
    console.log(`Express departing now from http://localhost:${port}`)
});



