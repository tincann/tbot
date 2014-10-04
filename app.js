var config = require('./config.js'),
  telegram = require('./tgram.js'),
	     Q = require('q');

var client = telegram.createClient();

client.on('connect', function(){
	console.log('connected!!');
	client.send('Morten', 'hallo!');
});

client.on('message', function(message){
	console.log('received:', message);
});