// const fs = require('fs');
// const util = require('util');
const express = require('express');
const path = require('path');
// const MarkdownIt = require('markdown-it');
// const fm = require('front-matter');
const articles = require('./articles');

const app = express();

// const readFileAsync = util.promisify(fs.readFile);

const hostname = '127.0.0.1';
const port = 3000;
// const encoding = 'utf8';

// Lesa innhald í möppunni articles
// function readFolder() {
//   return fs.readdirSync(path.join(__dirname, 'articles'));
// }

// // Lesa inn skrá
// async function read(file) {
//   try {
//     const data = await readFileAsync(file);
//     return data.toString(encoding);
//   } catch (e) {
//     console.log(e);
//   }
// }
// const slugs = [];

// Skrifa skrána á html format
// async function extFront(content) {
//   const front = fm(content);
//   console.log(front.attributes.slug);
//   console.log(front.attributes.title);
//   slugs.push(front.attributes.slug);
//   return front;
// }
// const files = [];

// function filterFiles(mappa) {
//   const out = [];
//   mappa.forEach(item => {
//     if (item.match(/\.md/)) {
//       out.push(item);
//     }
//   });
// }


// const input = 'articles/lorem-ipsum.md';
// const data = read(input);
// const mdfm = write(data);

async function main() {
  // let data = '';
  // try {
  //   data = await read(input);
  // } catch (e) {
  //   console.error('error', e);
  // }
  // const mdfm = await extFront(data);

  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/img', express.static(path.join(__dirname, 'articles/img')));
  app.use('/', articles);

  app.set('view engine', 'ejs');

  // Skrifa gögn úr body í index.html
  // app.get('/', (req, res, next) => {
  //   const md = new MarkdownIt();
  //   const article = md.render(mdfm.body);
  //   res.render('index', { title: 'Greinasafnið', article });
  //   next();
  // });

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

main().catch(err => console.error(err));
