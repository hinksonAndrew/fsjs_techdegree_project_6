const express = require('express');
const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');

app.use(mainRoutes);

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Oh no! Page not found!';
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log(err.message, "Status:", err.status);
  } else {
    err.message = 'Looks like something went wrong on the server.';
    console.log(err.message, "Status:", err.status);
  }
  res.send(err.message);
  
});

app.listen(3000, () => {
  console.log('The application is running on localhost: 3000! Enjoy!');
});