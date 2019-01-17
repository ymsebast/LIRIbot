require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require("request");
const keys = require('./keys');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
//Search up song details using Spotify API
if (command == "spotify-this-song") {
    // store user command line input
    var input = "";
    for (var i = 3; i < process.argv.length; i++) {
        input += process.argv[i] + " ";
    }
    console.log(input);
    var songQuery;
    if (input != "") {
        songQuery = input;
        console.log(songQuery);
    }
    else { //no song input 
        songQuery = "The Sign Ace of Base" //default entry
        console.log(songQuery);
    }
    RunSpotify(input);
}
//Search up movies details with OMDBApi
if (command == "movie-this") {
    // store user command line input
    var input = "";
    for (var i = 3; i < process.argv.length; i++) {
        input += process.argv[i].trim() + " ";
    }
    console.log("input:" + input);
    var movieQuery;
    if (input != "") {
        movieQuery = input;
        console.log(movieQuery);
    }
    else { //no song input 
        movieQuery = "Mr.Nobody" //default entry
        console.log(movieQuery);
    }
    RunOMDB(input);
}
// take the text inside of random.txt and then use it to call one of LIRI's commands
if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        var arr = data.split(",");
        if (arr[0] == "spotify-this-song") {
            RunSpotify(arr[1]);
        }
        if (arr[0] == "movie-this") {
            RunOMDB(arr[1]);
        }

    });
}

function RunSpotify(input) {
    //search song from spotify api
    spotify.search({ type: 'track', query: input, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //print artist(s), song name, link preview of spotify song, song's album
        var txt = `==============================================================
        song name            | ${data.tracks.items[0].name}
        artist(s)            | ${data.tracks.items[0].album.artists[0].name}
        album name           | ${data.tracks.items[0].album.name}
        spotify link preview | ${data.tracks.items[0].album.external_urls.spotify}`;
        console.log(txt);

        // console.log(`artist(s) : ${data.tracks.items[0].album.artists[0].name}`);
        // console.log(`album name : ${data.tracks.items[0].album.name}`);
        // console.log(`spotify link preview : ${data.tracks.items[0].album.external_urls.spotify}`);
        Log(txt);
    });
}
function RunOMDB(input) {
    //search movie from omdbapi
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(`${body}`);
            console.log(`==============================================================
            title :  ${JSON.parse(body).Title}
            year :  ${JSON.parse(body).Year}`);
            console.log(`year :  ${JSON.parse(body).Year}`);
            console.log(`IMDB rating :  ${JSON.parse(body).imdbRating}`);
            console.log(`Rotten Tomatoes rating :  ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country :  ${JSON.parse(body).Country}`);
            console.log(`Language :  ${JSON.parse(body).Language}`);
            console.log(`Plot :  ${JSON.parse(body).Plot}`);
            console.log(`Actors :  ${JSON.parse(body).Actors}`);
        }
    });

}
function Log(input) {
    fs.appendFile('log.txt', input, (err) => {
        if (err) throw err;
        console.log('The output was appended to file!');
      });
}