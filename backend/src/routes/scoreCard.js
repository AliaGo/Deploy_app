import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import db from '../db';
const router = Router();

router.delete("/cards", (_, res) => {
    const deleteDB = async () => {
        try {
            await ScoreCard.deleteMany({});
            console.log("Database deleted");
        } catch (e) { res.status(406).send({error: "Database deletion failed"});}
    };
    deleteDB();
    
    res.send({message: ("Database cleared.")})
});
router.post("/card", (req, res) => {
    const inputName = req.body.name
    const inputSubject = req.body.subject
    const inputScore = req.body.score
    const saveScore = async (name, subject, score) => {
        const existing = await ScoreCard.findOne({ name, subject});
        if (existing) {
            existing.score = inputScore;
            res.send({message: `Updating (${name+","+subject+","+inputScore})`});
            return existing.save();
        }
        else{
            const newScore = new ScoreCard({ name, subject, score });
            console.log("Created score", newScore);
            res.send({message: `Adding (${inputName+","+inputSubject+","+inputScore})`});
            return newScore.save();
        } 
   };
    
    saveScore(inputName, inputSubject, inputScore);
    
});
router.get("/cards", (req, res) => {
    const inputQueryType = req.query.queryType
    const inputQueryString = req.query.queryString
    const findCard = async (queryType, queryString) => {
        if(queryType === 'name'){
            var msgs = [];
            const existing = await ScoreCard.findOne({"name": queryString})
            if(existing) {
                const items = await ScoreCard.find({"name": queryString})
                var msgs = [];
                items.forEach(function(scores){
                    msgs.push(`Found card with name: (${queryString+","+scores.subject+","+scores.score})`);
                });
                res.send({messages: msgs})
            }
            else 
                res.send({message: `${queryType} (${queryString}) not found!`})
            
        }
        else if(queryType === 'subject'){
            var msgs = [];
            const existing = await ScoreCard.findOne({"subject": queryString})
            if(existing) {
                const items = await ScoreCard.find({"subject": queryString})
                var msgs = [];
                items.forEach(function(scores){
                    msgs.push(`Found card with subject: (${scores.name+","+queryString+","+scores.score})`);
                });
                res.send({messages: msgs})
            }
            else 
                res.send({message: `${queryType} (${queryString}) not found!`})
        }
    };
    findCard(inputQueryType, inputQueryString);

});
export default router;