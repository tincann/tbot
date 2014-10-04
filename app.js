var config = require('./config.js'),
	     Q = require('q'),
	 tgram = require('./tgram.js');

bot = tgram.create();   



bot.on('connect', function(){
	console.log('connected!!');
	bot.send('Mies', 'hallo!');
});


var init = function(){
	var defered = Q.defer();
	console.log('tbot started');
	setTimeout(function(){
		defered.resolve();		
	}, 2000);

	return defered.promise;	
}