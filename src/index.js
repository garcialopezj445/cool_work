const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//const passport = require('passport');

const {database} = require('./keys');
const { use } = require('passport');

//initializations
const app = express();
//require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));

app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'sessionmysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(passport.initialize());
//app.use(passport.session());

//global variables
app.use((req, res, next) => {
    app.locals.realizado = req.flash('realizado');
    app.locals.incorrecto = req.flash('incorrecto');
    //app.locals.usuario = req.prueba;
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use('/links', require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//starting de server
app.listen(app.get('port'), ()=> {
    console.log('server en puerto 4000');
});
