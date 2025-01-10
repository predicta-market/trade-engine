import mongoose from 'mongoose';
import {config} from '../server-config';
import Logger from '../logger';

const connTSDB = async () => {
    try {
        await mongoose.connect(config.tsdb.url, {
            dbName:config.tsdb.dbName
        });
        Logger.info('MongoDB connected successfully');
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
  }
};

export {connTSDB};
