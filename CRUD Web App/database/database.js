const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class Database {
  collections = {
    users: null,
    posts: null,
  };
  client = null;
  database = null;
  initialized = false;

  async setup() {
    this.client = await new mongodb.MongoClient("yourUserName").connect();
    this.database = await this.client.db("a2db");
    let listedCollections = await this.database
      .listCollections({}, { nameOnly: true })
      .toArray();
    let names = listedCollections.map((collection) => {
      return collection.name;
    });

    Object.keys(this.collections).forEach(async (key) => {
      if (names.includes(key)) {
        this.collections[key] = await this.database.collection(key);
        console.log(`Collection - ${key} was fetched`);
      } else {
        this.collections[key] = await this.database.createCollection(key);
        console.log(`Collection - ${key} was created`);
      }
    });

    this.initialized = true;
    console.log(`Database initialized with success.`);
  }
}

module.exports = {
  Database,
  ObjectId,
};
