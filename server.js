const express = require("express");
const mongodb = require("mongodb");
const uri = "mongodb+srv://cyf:Zh04n4s77d5tkLT4@cluster0.5kxur.mongodb.net/test"
const app = express();
app.use(express.json());

app.get("/", function (request, response) {
  const client = mongodb.MongoClient(uri);
  client.connect(() => {
  const db = client.db("cinema");
  const collection = db.collection("films");
  const film = {
    title: "Princess Mononoke",
    year: 1997,
    actors: ["Billy Crudup", "Billy Bob Thorton", "Claire Danes"],
  };
  collection.insertOne(film,(error,results)=> {
    response.json(error || results.ops[0]);
    client.close();
  })
})
})

app.post("/films",(req,res) => {
const client = mongodb.MongoClient(uri);
client.connect(function () {
    const db = client.db("cinema");
    const collection = db.collection("films");
    const film = {
        title: req.body.title,
        year: 1997,
        actors: req.body.actors
    };

    collection.insertOne(film,(error,result) => {
        res.send(error || result);
        client.close();
    })

})
})

app.get("/search",(req,res) => {
    const client = mongodb.MongoClient(uri);
    console.log("This is query",req.query);
    client.connect(function () {
        const db = client.db("cinema");
        const collection = db.collection("films");
        const film = {
            title: req.query.title,
            year: 1997,
            actors: req.query.actors.split(",")
        };
    
        collection.insertOne(film,(error,result) => {
            res.send(error || result.ops[0]);
            client.close();
        })
    
    })
    })
    



app.listen(3000);

