import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();
require('dotenv').config();
const db = mongoose.connection;
db.connect= () => {
    mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));
};

export default db;