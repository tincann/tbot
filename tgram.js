var child = require('child_process'),
	  net = require('net'),
	    Q = require('q'),
     util = require('util'),
   events = require('events');

var TGram = function(){
 	init.call(this);
 	this.connect();
};

util.inherits(TGram, events.EventEmitter);

TGram.prototype.connect = function() {
	var self = this;
	self.socket.connect(1942, '127.0.0.1', function(){
		self.socket.write('main_session\n');
		self.emit('connect');
	});
};

TGram.prototype.send = function(peer, message) {
	var command = util.format('msg', peer, message);
	console.log('sending command: \'' + command + '\'');
	this.socket.write(command + '\n');
};

TGram.prototype.close = function() {
	self.socket.write('safe_quit');
	self.cli.kill('SIGSTOP');
};

var init = function () {
	var self = this,
		i;

	self.cli = child.spawn('cli/telegram-cli', ['-k', 'cli/tg-server.pub', '-P', 1942]);

	self.socket = new net.Socket();
	self.socket.setEncoding('utf8');

	self.socket.on('data', function (buffer) {
		while((i = buffer.indexOf('\n'))){
			self.socket.emit('line', buffer.substr(0, i));
			buffer = buffer.substr(i + 1);
		}
	});
	self.socket.on('line', function(line){
		var message = parseMessage(line);
		if(message){
			self.emit('message', message);
		}
	});

	self.socket.on('close', function(){
		console.log('connection closed');
	});


	process.on('exit', function(){
		console.log('BYE!');
		self.close();
	});
}

var messagePattern = /^\[(.*?)\]\s{2}(.*?)\s(?:>>>|<<<|«««)\s(.+?)$/;
var parseMessage = function(string){
	var result = messagePattern.exec(string);
	//console.log(result);
	if(!result) return false;

	return {
		time: result[1],
		peer: result[2],
		body: result[3]
	};
};

var onMessage = function(){

};

module.exports = {
	createClient: function(){
		return new TGram();
	}
};
