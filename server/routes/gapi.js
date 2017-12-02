const express = require('express');
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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

//Get users
router.get('*', (req, res) => {
	var hash = req.originalUrl.slice(1);
	console.log(hash);
	connection((db) => {
		db.collection('blogData').findOne({'hash':hash})
			.then((blog) => {
				console.log(blog);
				res.json(blog);
			}).catch((err) => {
				sendError(err, res);
			});
	})
});

module.exports = router;