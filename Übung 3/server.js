var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('test', ['test']);
app.configure(function(){
	app.use(express.static(__dirname));
	app.use(express.bodyParser());
});
app.post('/db', function(req, res){
	var inhalt = req.body;
	console.log(inhalt);
	db.test.insert( { inhalt: inhalt });
	db.test.find(function(err, docs){
		res.send(docs);
	});
});
app.get('/getdb', function(req, res){
	db.test.find(function(err, docs){
		res.send(docs);
	});
});

app.listen(8080);
