require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var query = process.argv[2];
var input = process.argv[3];


if (query === 'my-tweets') {
var params = {screen_name: 'jamesCat'};
client.get('statuses/user_timeline',params, function(error, tweets, count, response, params) {
  if (!error) {
   
  }

  console.log(JSON.stringify(tweets, null, 2));
  
});
} else if (query === 'movie-this') {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Year of Release: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Rated);
        console.log("Rotten Tomatoes Rating: " + (JSON.parse(body).Ratings[{source: 'Rotten_Tomatoes', value: ''}]));
        console.log("Country Produced In: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Plot: " + JSON.parse(body).Plot);
    }
  });
} else if (query === 'spotify-this-song') {
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    var json = JSON.stringify(data, null, 2);
      console.log(json); 
      });

} else if (query === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
      });
}


