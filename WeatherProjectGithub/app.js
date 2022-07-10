const express=require("express");
const https=require("https");
const { stringify } = require("querystring");
const app=express();
app.get("/",function(req,res){
    // res.send("Weather data will be displayed here!");
    var url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=India&appid=b29a3bb4c0337551fd087b655d4ef7db";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            console.log(weatherdata);
            console.log(weatherdata.main.temp_max);
            console.log(weatherdata.weather[0].description);
            res.send("<h1><i>The temperature in India is "+temp+" degrees celcius</i></h1>");
        });
        //To stringify data
        // const stdata=JSON.stringify({gfdgaags:"gdgdsgf",dggfdgfe:"hdggd"});
        // console.log(stdata);

    });
});
app.listen(3000,function(){
    console.log("Server started successfully at port 3000!");
});
    
