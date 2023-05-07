const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
config();

const client = new MongoClient(process.env.MONGO_DB_URL);

const inventoryCollection = client.db("test").collection("inventory");
const usersCollection = client.db("test").collection("users");
const orderCollection = client.db("test").collection("order");
module.exports = { client, inventoryCollection, usersCollection, orderCollection }