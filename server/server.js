const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route files
const userRouter = require('./routes/user.router');
const polylineRouter = require('./routes/polyline.router');
const pointsRouter = require('./routes/points.router');
const routesRouter = require('./routes/routes.router');
const editRouter = require('./routes/edit.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration 
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes 
app.use('/api/user', userRouter);
app.use('/polyline',polylineRouter);
app.use('/points', pointsRouter)
app.use('/routes', routesRouter);
app.use('/edit', editRouter)

// Serve static files
app.use(express.static('build'));

// App Set 
const PORT = process.env.PORT || 3000;

// Listen 
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
