var child = require('child_process'),
	  net = require('net'),
	    Q = require('q'),
     util = require('util'),
   events = require('events');

var cli = child.spawn('cli/telegram-cli', ['-k', 'cli/tg-server.pub', '-P', 1942]);

var TGram = function(){
 	init.call(this);
 	this.connect();
};

util.inherits(TGram, events.EventEmitter);

TGram.prototype.connect = function() {
	var self = this;
	self.socket.connect(1942, '127.0.0.1', function(){
		console.log('really connected');
		self.socket.write('main_session\n');
		self.socket.write('contact_list\n');
		self.emit('connect');
	});
};

TGram.prototype.send = function(peer, message) {
	var command = util.format('msg', peer, message);
	console.log('sending command: \'' + command + '\'');
	this.socket.write(command + '\n');
};

var init = function () {
	var self = this,
	    buffer = '',
		i;

	self.socket = new net.Socket();
	self.socket.setEncoding('utf8');

	self.socket.on('data', function(data){
		console.log(data);
	});

/*
	self.socket.on('data', function (data) {
		console.log('data: ' + data);
		buffer += data;
		if((i = buffer.lastIndexOf('\r')) != -1){
			var line = buffer.substr(0, i);
			self.socket.emit('line', line);
			buffer = buffer.substr(i + 1);
		}
	});
	self.socket.on('line', function(line){
		console.log('line:', line);
	});
*/

	self.socket.on('close', function(){
		console.log('connection closed');
	});
}

module.exports = {
	create: function(){
		return new TGram();
	}
};
