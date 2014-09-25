var config = require('./config.js');

var http = require('http');


var data = JSON.stringify({
	test: 'test'
});

var options = {
	host: config.servers.test,
	port: 443,
	path: '/api',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}

};

var req = http.request(options, function(response){
	console.log(response.statusCode);
	console.log(response.headers);
	response.setEncoding('utf8');
	response.on('data', function(chunk){
		console.log(chunk);
	});
});

req.write(data);
req.end();

req.on('error', function(e){
	console.log("ER", e);
});
