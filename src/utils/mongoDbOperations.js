import * as Realm from "realm-web";

const APP_ID = process.env.REACT_APP_REALM_APP_ID;
console.log('Realm App ID:', APP_ID);

let app;
try {
  app = new Realm.App({ id: APP_ID });
  console.log('Realm app initialized successfully');
} catch (error) {
  console.error('Error initializing Realm app:', error);
}

const getMongoClient = async () => {
  if (!app) {
    throw new Error('Realm app not initialized');
  }
  try {
    if (!app.currentUser) {
      const user = await app.logIn(Realm.Credentials.anonymous());
      console.log('Logged in anonymously:', user.id);
    }
    return app.currentUser.mongoClient("mongodb-atlas");
  } catch (error) {
    console.error('Error in getMongoClient:', error);
    throw error;
  }
};
    
const performMongoDbOperation = async (action, collection, payload) => {
    if (!APP_ID) {
      throw new Error('Realm App ID is not set. Check your environment variables.');
    }
  
    console.log('Performing MongoDB operation:');
    console.log('Action:', action);
    console.log('Collection:', collection);
    console.log('Payload:', JSON.stringify(payload, null, 2));
  
    try {
      const mongo = await getMongoClient();
      const db = mongo.db("coding_platform_db");
      const coll = db.collection(collection);
  
      let result;
      switch (action) {
        case 'findOne':
          result = await coll.findOne(payload.filter);
          break;
        case 'find':
          result = await coll.find(payload.filter, { sort: payload.sort, limit: payload.limit });
          break;
        case 'insertOne':
          result = await coll.insertOne(payload.document);
          break;
        case 'updateOne':
          result = await coll.updateOne(payload.filter, { $set: payload.update });
          break;
        case 'deleteOne':
          result = await coll.deleteOne(payload.filter);
          break;
        default:
          throw new Error(`Unsupported action: ${action}`);
      }
  
      console.log('Operation result:', result);
      return result;
    } catch (error) {
      console.error('Error performing MongoDB operation:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        action,
        collection,
        payload
      });
      throw error;
    }
  };
const findOne = async (collection, filter) => {
    const result = await performMongoDbOperation('findOne', collection, { filter });
    return result;
};

const find = async (collection, filter, sort = {}, limit = 100) => {
    const result = await performMongoDbOperation('find', collection, { filter, sort, limit });
    return result;
};

const insertOne = async (collection, document) => {
    const result = await performMongoDbOperation('insertOne', collection, { document });
    return result.insertedId;
};

const updateOne = async (collection, filter, update) => {
    const result = await performMongoDbOperation('updateOne', collection, { filter, update });
    return result.modifiedCount;
};

const deleteOne = async (collection, filter) => {
    const result = await performMongoDbOperation('deleteOne', collection, { filter });
    return result.deletedCount;
};

const incrementSolvedCount = async (studentId) => {
    const mongo = await getMongoClient();
    const db = mongo.db("coding_platform_db");
    const collection = db.collection("students");
    const result = await collection.updateOne(
        { _id: studentId },
        { $inc: { solvedCount: 1 } }
    );
    return result.modifiedCount;
};

const addTask = async (task) => {
    const result = await insertOne('tasks', task);
    return result;
};

export { findOne, find, insertOne, updateOne, deleteOne, incrementSolvedCount, addTask };