import mongoose from 'mongoose';
import userAdminSeed from '../models/dataSeeds/userAdminSeed';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  dbName: process.env.MONGODB_DBNAME,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true, // Don't build indexes
  reconnectTries: 10, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const isSeed = false;

const databaseConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_HOST, options);
      console.log('Connected to MongoDb');
      if(isSeed) userAdminSeed()
    } catch (error) {
        throw new Error(error)
    }
};

export default databaseConnect;
