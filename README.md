# LIRIbot
 Language Interpretation and Recognition with command line interface using node that takes in parameters and gives you back data from various APIs.

## Spotify API 

 To find the song details 

```
node liri.js spotify-this-song '<song name here>'
 ```
 This will show the following information about the song in your terminal/bash window:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

![Screenshot](/img/spotify.png)
![Screenshot](/img/spotify-log.png)

If no song is provided then your program will default to "The Sign" by Ace of Base.

## OMDB API

To find the movie details 

```
node liri.js movie-this '<movie name here>'
```
This will output the following information to your terminal/bash window:

 * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  
![Screenshot](/img/omdb.png)
![Screenshot](/img/omdb-log.png)

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

## Read Text File
```
node liri.js do-what-it-says
```
LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  
![Screenshot](/img/fs.png)
![Screenshot](/img/fs-log.png)
