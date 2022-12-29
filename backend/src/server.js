import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import routes from './routes';
import path from 'path';
import ScoreCard from './models/ScoreCard';

db.connect();


const app = express();



if(process.env.NODE_ENV === "development"){
    app.use(cors());
}

//app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', routes);


if(process.env.NODE_ENV === "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
const port = process.env.PORT || 4001;
app.get('/', (req, res) => {

 res.send('Hello, World!');
});
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);

db.on('error', (err) => console.error('connection error', err)); // 連線異常
db.once('open', (db) => console.log('Connected to MongoDB')); // 連線成功
/*
const saveScore = async (name, subject, score) => {
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing) throw new Error(`data ${name, subject} exists!!`);
    try {
        const newScore = new ScoreCard({ name, subject, score });
        console.log("Created score", newScore);
        return newScore.save();
    } catch (e) { throw new Error("Score creation error: " + e); }
   };
const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};
db.on("error", (err) => console.log(err));
db.once("open", async () => {
 await deleteDB();
 await saveScore("Alia", "math", 100);
 await saveScore("Sandy", "geography", 75);
 await saveScore("Peter", "economics", 70);
});*/