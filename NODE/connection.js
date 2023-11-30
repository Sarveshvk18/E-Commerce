// connection.js
const { MongoClient } = require('mongodb');


const connectionString = 'mongodb://127.0.0.1:27017/';
const dbName = 'Andriod';


let client;
let db;


async function connectDB() {
  try {
    client = await MongoClient.connect(connectionString);
    db = client.db(dbName);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}


function getDB() {
  return db;
}


function closeDB() {
  client.close();
  console.log('Connection to the database closed');
}


module.exports = { connectDB, getDB, closeDB };
