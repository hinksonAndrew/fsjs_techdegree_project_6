const express = require('express');
const app = express();

/**
 * Set up static route for css, js, img, etc
 */
app.use('/static', express.static('public'));

/**
 * Set up view engine for pug templates
 */
app.set('view engine', 'pug');

/**
 * Removed routes from app.js and routed to "routes" file
 */
const mainRoutes = require('./routes');
app.use(mainRoutes);

/**
 * 404 Error Handler - Generic page not found
 */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Page Does Not Exist or has moved.';
  next(err);
});

/**
 * Global Error Handler - Everything else thats not 404
 */
app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log(err.message, "Status:", err.status);
    res.render('page-not-found', { err });
  } else {
    err.message = 'Looks like something went wrong on the server.';
    console.log(err.message, "Status:", err.status);
    res.render('error', { err });
  }
});

/**
 * Listening on port 3000
 */
app.listen(3000, () => {
  console.log('The application is running on localhost: 3000! Enjoy!');
});