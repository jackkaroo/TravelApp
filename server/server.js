const express = require("express");
const app = express();


app.listen(8080);

app.use(express.static('public'));
app.get("/", function(request, response){     
    response.sendFile(__dirname + '/index.html');
});

console.log('Сервер стартовал!');
// створюємо сервер і починаемо слухати
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 9000});

// підключення до бд
var MongoClient = require('mongodb').MongoClient,
format = require('util').format;   

var userListDB;

// подсоединяемся к БД
MongoClient.connect('mongodb+srv://user:<password>@cluster0-mgmwz.mongodb.net/<dbname>?retryWrites=true&w=majority', function (err, client) {
	var db = client.db('test');
	if (err) {throw err}

	//полкикання на табл з учьоткамі (логін, пароль, збережені поїздки)
	userListDB = db.collection('users');
});



function existUser (user, callback) {
	userListDB.find({login: user}).toArray(function (error, list) {
		callback (list.length !== 0);
	});
}
function checkUser (user, password, callback) {
	
	existUser(user, function (exist) {		
		if (exist) {			
			userListDB.find({login: user}).toArray(function (error, list) {
				
				callback (list.pop().password === password);
			});
		} else {
			callback (false);
		}
	});
}

function regUser (user, password, callback) {
	
	existUser(user, function (exist) {
		
		if (exist) {
			callback(false);
		} else {
			userListDB.insert ({login: user, password: password, favourites : [], {w:1}, function (err) {
				if (err) {throw err}
			});
			callback (true);
		}
	});
}

//слухач на чергове підключення клієнта
wss.on('connection', function (ws) {	
	
	var login = '';
	var registered = false;
	
	
	ws.on('message', function (message) {		
		var event = JSON.parse(message);		
		if (event.type === 'authorize') {	
		//чи є в базі		
			checkUser(event.user, event.password, function (success){				
				registered = success;				
				var returning = {type:'authorize', success: success};				
				if (success) {	
					login = event.user;
					sendProfile(ws,login);
				}
				ws.send (JSON.stringify(returning));
			});
		} else if (event.type === 'register'){
			//якщо немає в базі реєструємо	
			regUser(event.user, event.password, function (success) {
				var returning = {type:'register', success: success};
				ws.send (JSON.stringify(returning));
			});
		} else {
			if (registered) {
				if (event.type==='favourite') {					
					userListDB.updateOne({login : login}, {$push: {favourites: event.message}});
				}	
			}
		}
	});
});

//відпарвка подомлень на клієнт при вході 
function sendProfile (ws, login) {
	var returning = {type:'favourite', favourites: userListDB.findOne({login: login}).favourites, success: success};
	ws.send (JSON.stringify (returning));
}

Array.prototype.exterminate = function (value) {
	this.splice(this.indexOf(value), 1);
}