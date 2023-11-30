const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const { getDB } = require('./connection');

const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  const db = getDB();
  const products = db?.collection('products');
  const result = await products.find({}).toArray();
  res.json(result);
});
module.exports = router;