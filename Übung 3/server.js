var express = require('express');
var mongojs = require('mongojs');
var app = express();
var BSON = require('mongodb').BSONPure;
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
	try{
		db.test.find( { $and: [ { email: req.query.email }, { _id: new BSON.ObjectID(req.params.id) } ] } , function(err, docs){
			if(err){
				res.status(500).send('Falsche ID angegeben');
			}else{
				res.status(200).send(docs);
			}
		});
	}catch(e){
		res.status(500).send('Falsche ID angegeben');
	}
});

app.get('/api/v1/sequenzes/', function(req, res){
	if(!req.query.email || req.query.email === ''){
		res.status(401).send('Email Identifizierung gescheitert');
	}else{
		db.test.find( { email: req.query.email }, function(err, docs){
			res.status(200).send(docs);
		});
	}
});

app.post('/api/v1/sequenzes/', function(req, res){
	if(req.body.email === '' || !req.body.email){
		res.status(401).send('Email Identifizierung gescheitert');
	}else if(!req.body.name || req.body.name === ''){
		res.status(406).send('Kein Name eingegeben');
	}else{
		db.test.insert(req.body);
		console.log(req.body._id);
		db.test.find( { email: req.body.email }, function(err, docs){
			res.status(201).send(docs);
		});
	}
});

app.put('/api/v1/sequenzes/:id', function(req, res){
	try{
		db.test.update( 
			{  $and: [ {_id: new BSON.ObjectID(req.params.id) }, {email: req.body.email} ] },
			{
				$set: {elemente: req.body.elemente, linien: req.body.linien } }, function(docs){
					res.status(200).send(docs);
			}
		);
	}catch(e){
		res.status(500).send('Falsche ID angegeben');
	}
});

app.delete('/api/v1/sequenzes/:id', function(req, res){
	try{
		db.test.remove( { $and: [ { email: req.body.email }, { _id: BSON.ObjectID(req.params.id) } ] } );
		db.test.find( { email: req.body.email }, function(err, docs){
		res.status(200).send(docs);
	});
	}catch(e){
		res.status(500).send('Falsche ID angegeben');
	}
});

app.listen(8080);
