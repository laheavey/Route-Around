const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route files
const userRouter = require('./routes/user.router');
const polylineRouter = require('./routes/polyline.router');
const popularRoutesRouter = require('./routes/popularRoutes.router');
const popularPointsRouter = require('./routes/popularPoints.router')
const allRoutesRouter = require('./routes/allRoutes.router');
const allPointsRouter = require('./routes/allPoints.router');
const routeDetailRouter = require('./routes/routeDetail.router');
const pointDetailRouter = require('./routes/pointDetail.router');

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
app.use('/popular/routes', popularRoutesRouter);
app.use('/popular/points', popularPointsRouter);
app.use('/allRoutes', allRoutesRouter);
app.use('/allPoints', allPointsRouter);
app.use('/routeDetail', routeDetailRouter);
app.use('/pointDetail', pointDetailRouter); 

// Serve static files
app.use(express.static('build'));

// App Set 
const PORT = process.env.PORT || 5000;

// Listen 
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
