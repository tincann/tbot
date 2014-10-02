var readline = require('readline'),
      config = require('./config.js'),
	   child = require('child_process');

var cli = child.spawn('cli/telegram-cli', ['-k', 'cli/tg-server.pub']);

cli.stdout.setEncoding('utf8');
cli.stdout.on('data', function (data) {
	console.log(data);
})

cli.stdin.setEncoding('utf8');

var message = 'Hoi vanuit de bot!';

cli.stdin.write('contact_list\n');
setTimeout(function(){
	cli.stdin.write('msg Mies ' + message + '\r\n');
}, 2000);



console.log('tbot started');