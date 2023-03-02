const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+ "/index.html");

});

app.post("/",function(req,res){

      const query =req.body.nameCity;
      const apiid="462e65b5694ac2fa326992a3d47d94f9";

      const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiid;

      https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){

          const weatherData=JSON.parse(data);
          const temp=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.write("<p>The temperature is"+temp+"in "+ query+ "<p>");
          res.write("<h1>The temperature is"+temp+"</h1>");
          res.write("<img src="+imageURL +">");
          res.send();

        });
      });
});


app.listen(3000,function(){
  console.log("server is running on port3000.");
});
