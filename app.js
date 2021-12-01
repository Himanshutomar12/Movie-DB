const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const https = require("https");
const axios = require("axios");

const app = express();
//ejs templating
app.set('view engine', 'ejs')
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//static files
app.use(express.static("public"))




app.get("/", function(req, res){
     res.render("search")

   });

app.post("/", function(req, res){
  const movieName = req.body.movieName;
  const url = "https://www.omdbapi.com/?t=" + movieName + "&apikey=e4a05ad0";

  axios.get(url).then(function(response){
    console.log(response.data.Response);
     if(response.data.Response === "True"){
       res.render("success", {
         title: response.data.Title,
         released: response.data.Released,
         genre: response.data.Genre,
         plot: response.data.Plot,
         language: response.data.Language,
         poster: response.data.Poster,
         director: response.data.Director,
         award: response.data.Award,
         imdb: typeof response.data.Ratings[0] === "undefined"? "-/-" :response.data.Ratings[0].Value,
         rottenTomatoes: typeof response.data.Ratings[1] === "undefined"? "-/-" :response.data.Ratings[1].Value,
         metacritic:  typeof response.data.Ratings[2] === "undefined"? "-/-" :response.data.Ratings[2].Value

       })
     }else{
       res.render("failure");
     }
  })


})

app.post("/back", function(req, res){
  res.redirect("/");
})

app.post("/searchFail", function(req, res){
  res.redirect("/");
})


let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
  console.log("Server has started successfully");
});
