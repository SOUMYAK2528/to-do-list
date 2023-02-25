const express= require("express");
const app= express();
const bodyparser= require("body-parser");

app.get("/",function(req,res){
    var day = new Date();
    if(day.getDay() === 0)
      res.send("fine it is sunday ");
    else{
        res.send("boreing !!!!");
    }  
});

app.listen(3000,function(){
    console.log("port 3000 is used");
});