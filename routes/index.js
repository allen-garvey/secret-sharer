var express = require('express');
var router = express.Router();

const itemStore = require('../models/items-store');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/items', function(req, res, next) {
  const id = itemStore.set({
    title: req.body.title,
    content: req.body.content,
  });
  res.render('items/created', { itemUrl: `/items/${id}` });
});

router.get('/items/:id', function(req, res, next) {
  const item = itemStore.get(req.params.id);
  if(!item){
    return next({status: 404});
  }
  res.render('items/show', { item });
});

router.get('/items/:id/json', function(req, res, next) {
  const item = itemStore.get(req.params.id);
  if(!item){
    return res.sendStatus(404);
  }
  res.json(item);
});

router.get('/items/:id/content/txt', function(req, res, next) {
  const item = itemStore.get(req.params.id);
  if(!item){
    return res.sendStatus(404);
  }
  res.send(item.content);
});

module.exports = router;
