const fs = require('fs')

const express = require('express');
const path = require('path');
const MarkdownIt = require('markdown-it');
const fm = require('front-matter');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const encoding = 'utf8';
function read(file) {
  const data = fs.readFileSync(file)

  return data.toString(encoding);
}

function write(content) {
  const md = new MarkdownIt();
  const front = fm(content);
  console.log(front);
  const result = md.render(front.body);
  return result;
}
const input = 'articles/batman-ipsum.md';
const data = read(input);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const body = write(data);  
  res.render('index', { title: 'Forsíða', body});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
