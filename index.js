var express = require('express');
var app = express();
var user = require('./Routing/user.js');
var bodyParser=require('body-parser');
var request=require('request')
var api='a4af8f2e3276efc9318e1269d0db0cf0'


app.use(express.static('public'));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true})); // To available form data in the req.body
app.use('/user',user);

app.get('/',(req,res) => {
    res.render('index',{weather:null,error:null});
})

app.post('/',(req,res)=>{
    console.log(req.body.city);
    let city=req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
     request(url,(err,response,body)=>{
         if(err)
         {
             console.log('err',err);
         }
         else
         {  
             console.log(JSON.parse(body));
             let weathers=JSON.parse(body);
             if(weathers.main===undefined)
             {
                 res.render('index',{weather:null,error:"Error, Please Try again with different Name"});
             }
             else{
             let message=`Temperature : ${weathers.main.temp} Celsius, from ${weathers.name}`;
             console.log(message);
             res.render('index',{weather:message,error:null})
             }
         }
     })

})  




app.listen(3000,()=>{
    console.log("Server is Started");
})