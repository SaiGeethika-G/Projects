const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { stringify } = require("querystring");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    // res.send("Weather data will be displayed here!");
    var url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=India&appid=b29a3bb4c0337551fd087b655d4ef7db";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            res.set("Content-Type", "text/html");
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherDescription=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("The weather is currently "+weatherDescription);
            res.write("<h1>The temperature in India is "+temp+" degrees celcius</h1>");
            res.write("<img src="+imgurl+" alt="+icon+">");
            res.send();
        });
        //To stringify data
        // const stdata=JSON.stringify({gfdgaags:"gdgdsgf",dggfdgfe:"hdggd"});
        // console.log(stdata);

    });
});

//For entered city
app.get("/city",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/city",function(req,res){
    var city=req.body.city;
    var apikey="b29a3bb4c0337551fd087b655d4ef7db";
    var url="https://api.openweathermap.org/data/2.5/weather?units=metric&q="+city+"&appid="+apikey;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            res.set("Content-Type", "text/html");
            const userCityData=JSON.parse(data);
            const temp=userCityData.main.temp;
            const weatherDescription=userCityData.weather[0].description;
            const icon=userCityData.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("The weather is currently "+weatherDescription);
            res.write("<h1>The temperature in "+city+" is "+temp+" degrees celcius</h1>");
            res.write("<img src="+imgurl+" alt="+icon+">");
            res.send();
        })
    })
});

app.listen(3000,function(){
    console.log("Server started successfully at port 3000!");
});
    
