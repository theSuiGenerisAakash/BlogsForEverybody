const express = require('express');
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bootbox = require('bootbox');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/bfore', (err, db) => {
        if(err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};


// Response handling
let response = {
    status : 200, data : [], message : null
};


// Variable for holding the random line number
var rowNumberTemp = 1;


// Storing blog
router.post('/feed', (req,res) => {
	
	const nthline = require('nthline')
		, filePath = path.join(__dirname,'../dict/words_alpha.txt')
		, rowNumber = 0	
	
	function getRowNum(){
	
	nthline(rowNumber, filePath)
		.then((rowNumberFinal) => {
			//console.log(rowNumberFinal);
			rowNumberTemp = Math.floor((Math.random() * (parseInt(rowNumberFinal)))+1);
			console.log(rowNumberTemp);
		}).catch((err) => {
			sendError(err, res);
		});
	}	

	delete req.body._id;
	myData = req.body;
	
	if(req.body['editable']=="false")
	{
		getRowNum();
		setTimeout(function(){nthline(rowNumberTemp, filePath)
			.then((line) => {
				myData['hash']=line;
				connection((db) => {
					db.collection('blogData').insertOne(myData);
				})
				console.log(myData);
				res.json(myData);
			}).catch((err) => {
				sendError(err, res);
			})
		},100);
	}
	else
	{
	    getRowNum();
		setTimeout(function(){nthline(rowNumberTemp,filePath)
			.then((line1) =>{
				myData['hash']=line1;
			}).catch((err) => {
				sendError(err, res);
			});
			getRowNum();
		},100);
		setTimeout(function(){nthline(rowNumberTemp,filePath)
			.then((line2) =>{
				myData['hashpwd']=line2;
				connection((db) => {
					db.collection('blogData').insertOne(myData);
				})
				console.log(myData);
				res.json(myData);
			}).catch((err) => {
				sendError(err, res);
			});
		},1000);
	}
});

router.post('/refeed', (req, res) => {
	delete req.body._id;
	myData = req.body;
	connection((db) => {
		db.collection('blogData').update({"hash":myData['hash']},{$set:{"feed":myData['feed']}})
	})
	console.log(myData);
	res.json({'success':'true'});
});



router.post('/comment', (req, res) => {
	delete req.body._id;
	myData = req.body;
	hash=myData['hash'];
	delete myData['hash'];
	connection((db) => {
		db.collection('blogData').update({"hash":hash},{$push:{"comments":myData}})
	})
	console.log(myData);
	res.json({'success':'true'});
});


module.exports = router;
