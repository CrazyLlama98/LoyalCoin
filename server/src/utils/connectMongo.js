import * as constants from '../constants';
import mongoose from 'mongoose';

export default async function () {
    await mongoose.set('useCreateIndex', true)
    await mongoose.set('useFindAndModify', false);
    await mongoose.connect(constants.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true
    }, async (err) => {
        if (err) {
            await console.log('connect to database failed =', err);
        } else {
            await console.log('connected to database successfully');
        }
    });
}