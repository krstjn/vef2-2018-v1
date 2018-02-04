const express = require('express');
const path = require('path');
const articles = require('./articles');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;


async function main() {
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/img', express.static(path.join(__dirname, 'articles/img')));
  app.use('/', articles);

  app.set('view engine', 'ejs');

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

main().catch(err => console.error(err));
