var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('test', ['test']);
app.configure(function(){
	app.use(express.static(__dirname));
	app.use(express.bodyParser());
});
app.put('/db', function(req, res){
	var inhalt = req.body.email;
	console.log(req.body.email);
	db.test.insert( req.body );
	db.test.find(function(err, docs){
		res.send(docs);
	});
});

app.get('/getdb', function(req, res){
	db.test.find(function(err, docs){
		res.send(docs);
	});
});

app.get('/api/v1/sequenzes/:id', function(req, res){
	db.test.find( { $and: [ { email: req.query.email }, { name: req.params.id } ] } , function(err, docs){
		res.send(docs);
	});
});

app.get('/api/v1/sequenzes/', function(req, res){
	db.test.find( { email: req.query.email }, function(err, docs){
		res.send(docs);
	});
});

app.put('/api/v1/sequenzes/', function(req, res){
	db.test.insert(req.body);
	db.test.find( { email: req.body.email }, function(err, docs){
		res.send(docs);
	});
});

app.delete('/api/v1/', function(req, res){
	db.test.remove( { $and: [ { email: req.body.email }, { name: req.body.name } ] } , function(err, docs){
		res.send(docs);
	});
});

app.listen(8080);
