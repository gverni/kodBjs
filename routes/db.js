var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var movies = [];
	var db = new sqlite3.Database('./_kodi_sample_db/Database/MyVideos93.db',sqlite3.OPEN_READWRITE,function(err) {
  		if (!err) {
    			console.log('connected to KodiDB');
  		} else {
    			throw err;
  		};
	});

	//db = req.app.get(db); 
	//db.each("SELECT *  FROM movie", function(err, row) {
      	//	console.log(row.c00);
  	//});

	db.each("SELECT *  FROM movie", [], function(err, row) {
		var startpos = row.c08.indexOf('preview="') + 9;
		var endpos = row.c08.indexOf('"', startpos+1); 
		var posterurl = row.c08.substring(startpos, endpos); 
		var movie = {title: row.c00, poster:posterurl}; 
		movies.push(movie);
		//fanarts.push(rows.c20);
	}, function(err, number) {
		res.render('movieslist', { title: 'Movie list', movies: movies});
	}); 



	
});

//cache handling 
// var posterurl = "Select * from movie" => row.c08
// In Texture13 => select * from texture where url="$posterurl" => cachedurl

module.exports = router;
