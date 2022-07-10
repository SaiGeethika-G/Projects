const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    var n1=req.body.num1;
    var n2=req.body.num2;
    var sum=Number(n1)+Number(n2);
    res.send("The calculated result is:"+sum);
});

app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});
app.post("/bmiCalculator",function(req,res){
    var wt=parseFloat(req.body.wt);
    var ht=parseFloat(req.body.ht);
    var bmi=wt/(ht*ht);
    res.send("Your BMI is: "+bmi);
});
app.listen(3000,function(){
    console.log("Server started successfully at port 3000 ")
});