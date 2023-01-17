import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { eErrorMessage } from '../app/enum/error-message.enum';
import { eSuccessMessage } from '../app/enum/success-message.enum';

dotenv.config();

export const mongooseConnection = mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.v8wyvs4.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log(eSuccessMessage.DbSuccessMessage);
  }).catch(err => {
    console.log(eErrorMessage.DbErrorMessage, err);
    process.exit();
  });
