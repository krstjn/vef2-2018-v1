/* útfæra greina virkni */
const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const MarkdownIt = require('markdown-it');
const fm = require('front-matter');
const moment = require('moment');

const router = express.Router();
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const encoding = 'utf8';

async function read(file) {
  try {
    const data = await readFile(file);
    return data.toString(encoding);
  } catch (e) {
    console.error(e);
    return e;
  }
}

router.get('/:slug', async (req, res, next) => {
  try {
    const folder = await readDir(path.join(__dirname, 'articles'));
    const filteredFiles = folder.filter(item => item.includes('.md'));
    const filesRead = filteredFiles.map(item =>
      read(path.join(__dirname, 'articles', item)));
    const files = await Promise.all(filesRead.map(async item =>
      item.then(file => fm(file.toString(encoding)))));
    const findSlug = files.filter(item => item.attributes.slug === req.params.slug);
    const file = findSlug[0];
    if (file === undefined) {
      next();
    } else {
      const md = new MarkdownIt();
      const article = md.render(file.body);
      res.render('article', { title: file.attributes.title, article });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:slug', (req, res) => {
  res.render('notfound', { title: 'Fannst ekki', message: 'Ó nei, efnið fannst ekki' });
});

router.get('/', async (req, res, next) => {
  try {
    const folder = await readDir(path.join(__dirname, 'articles'));
    const filteredFiles = folder.filter(item => item.includes('.md'));
    const filesRead = filteredFiles.map(item => read(path.join(__dirname, 'articles', item)));
    const files = await Promise.all(filesRead.map(async item =>
      item.then(file => fm(file.toString(encoding)))));
    const filterFM = files.map(item => item.attributes);
    filterFM.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
    res.render('index', { title: 'Greinasafnið', filterFM, moment });
  } catch (e) {
    console.error(e);
    next();
  }
});

router.get('/', (req, res) => {
  res.render('articles', { title: 'Villa kom upp' });
});

module.exports = router;
