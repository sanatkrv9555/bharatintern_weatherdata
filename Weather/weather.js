const express = require("express");
const https = require("https");
const app = express();
const body = require("body-parser");
app.use(body.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/weather.html");
});  
app.post("/",(req,res)=>
{
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=f6a0f6299a02fac753d3060794c204aa";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>
        {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weather_descript = weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log("The temperature of the place = "+temp+" deg Celsius");
            console.log("Weather Description = ",weather_descript);
            //Only one res.send() is allowed in order to send multiple data to the server we use res.write()

            res.write("<h1> Weather Description = "+ weather_descript +"</h1>");
            res.write("<h2>The Temperature of the place is = "+temp+" degree celsius<h2>");
            res.write("<img src ="+imgurl+">");
            res.send();
        })
    })
   
})
// 127.0.0.1
app.listen(3000,()=>
{
    console.log("Server is listening at port 3000")
});





