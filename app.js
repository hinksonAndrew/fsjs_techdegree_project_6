const express = require('express');
const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');

app.use(mainRoutes);

app.use((req, res) => res.send('<h1>Expressis working!'));
app.listen(3000, () => {
  console.log('The application is running on localhost: 3000! Enjoy!');
});