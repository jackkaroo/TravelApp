const express = require('express');
const path = require('path');
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
var config = require('./config/config.json');
const cookieParser = require('cookie-parser');

const app = express();

// cookie parser
app.use(cookieParser());

// express body parser json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static 
app.use(express.static(__dirname + '/public'));

//routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));
app.use('/bookmark', require('./routes/bookmark.route'));

//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
    //res.render('error');
});

async function start() {
    try {
        await mongoose.connect(
            config.db.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
            ()=> console.log("Connected to mongo on port " + 3000)
        );
        app.listen(3000);
    }catch(e){
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();


// mongoose.connect(config.db.mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }, function (err, client) {
//     if (err) {
//         console.log(err);
//     }
//     console.log('Successfully connected to database');
// });

// module.exports = app;
