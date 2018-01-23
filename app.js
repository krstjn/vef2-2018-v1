const fs = require('fs')

const express = require('express');
const path = require('path');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Forsíða' });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
