import * as mongoose from 'mongoose';
import * as config from 'config';

const dbConfig = config.get('database');

const MONGO_OPTIONS = {
  connectTimeoutMS: 360000,
  socketTimeoutMS: 360000,
  maxPoolSize: 30,
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<mongoose.Connection> => {
      const connection = await mongoose.createConnection(
        dbConfig.uri,
        MONGO_OPTIONS,
      );
      return connection;
    },
  },
];
