const express = require("express");
const mongodb = require("mongodb");
const { request, response } = require("express");
// const uri = "mongodb+srv://cyf:Zh04n4s77d5tkLT4@cluster0.5kxur.mongodb.net/test";
// const uri ="mongodb+srv://LetsLearnMongoDB2020:GS80GXf7ds2gIuLK@cluster0.5kxur.mongodb.net/test"
const uri =
  "mongodb+srv://cyf:6Cd37enBZ2YsqfWj@cluster0.5kxur.mongodb.net/test";
const app = express();
app.use(express.json());

app.get("/", function (request, response) {
  const client = mongodb.MongoClient(uri, { useUnifiedTopology: true });
  client.connect(() => {
    const db = client.db("cinema");
    const collection = db.collection("films");
    const film = {
      title: "Princess Mononoke",
      year: 1997,
      actors: ["Billy Crudup", "Billy Bob Thorton", "Claire Danes"],
    };
    collection.insertOne(film, (error, results) => {
      response.json(error || results.ops[0]);
      client.close();
    });
  });
});

app.post("/films", (request, response) => {
  const client = mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("cinema");
    const collection = db.collection("films");
    const film = {
      title: request.body.title,
      year: request.body.year,
      actors: request.body.actors,
    };

    collection.insertOne(film, (error, result) => {
      response.send(error || result);
      client.close();
    });
  });
});

app.get("/search", (request, response) => {
  const client = mongodb.MongoClient(uri);
  console.log("This is query", request.query);
  client.connect(function () {
    const db = client.db("cinema");
    const collection = db.collection("films");
    const film = {
      title: request.query.title,
      year: request.body.year,
      actors: request.query.actors.split(","),
    };
    collection.insertOne(film, (error, result) => {
      response.send(error || result.ops[0]);
      client.close();
    });
  });
});

app.delete("/films",(request,response) => {
    const client = new mongodb.MongoClient(uri);
    client.connect(() => {
        const db = client.db("cinema");
        const collection = db.collection("films");
        const searchObj = {title : "Princess Mononoke"};
        collection.deleteOne(searchObj,(error,result) => {
            if(error){
                response.sendStatus(500);
            }
            else if(result.deletedCount){
                response.status(204).send("Deleted");
            }
            else{
                response.sendStatus(500);
            }
        })
    })
});


app.delete("/films/:title", function (request, response) {
    const client = new mongodb.MongoClient(uri);
    client.connect(function () {
      const db = client.db("cinema");
      const collection = db.collection("films");
  
      const searchObject = { title: request.params.title };
  
      collection.deleteOne(searchObject, function (error, result) {
        if (error) {
          response.status(500).send(error);
        } else if (result.deletedCount) {
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
  
        client.close();
      });
    });
  });






app.listen(3000);
