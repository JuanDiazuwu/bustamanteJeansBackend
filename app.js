const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');

const JwtKey = "57a48587453fd4e544b8e3f2db8d2ca9";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const productsRouter = require('./routes/products');
const catalogsRouter = require('./routes/catalogs');
const inventoriesRouter = require('./routes/inventories');
const layawaysRouter = require('./routes/layaways');

const app = express();

// Data bases
           //mongodb://<dbUser>?:<dbPass>?@<url>:<port>/<dbName>
const url = "mongodb://localhost:27017/dbBustamante"
mongoose.connect(url);

const db = mongoose.connection;
db.on('open', ()=> {
  console.log("Connection OK");
});

db.on('error', ()=> {
  console.log("Connection Failed")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(expressjwt({secret:JwtKey, algorithms:['HS256']}).unless({path:['/login']}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/products', productsRouter);
app.use('/catalogs', catalogsRouter);
app.use('/inventories', inventoriesRouter);
app.use('/layaways', layawaysRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
