const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/index", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/index", function(req , res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  //working with parameters
  var options ={
    url : "https://apiv2.bitcoinaverage.com/convert/global",
    method : "GET",
    qs :{
      from : crypto,
      to : fiat,
      amount : amount
    }
  }
  request(options , function(error, respone, body){
    console.log(respone.statusCode);
    var data = JSON.parse(body);
    var result = data.price;
    var date = data.time;
    res.write("<p>"+"The time is: "+date+"</p>");
    res.write("<h1>The conversion of"+amount+crypto+" is: "+result+fiat);
    res.send();



  });
});

app.listen(5000, function (){
  console.log("Listen at port number 5000");
});
