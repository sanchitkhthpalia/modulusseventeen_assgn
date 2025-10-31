import mongoose from 'mongoose';
import { config } from './env';

export async function connectToDatabase(): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  return mongoose.connect(config.mongoUri);
}


