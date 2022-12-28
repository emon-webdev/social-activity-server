const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();

const Port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const allPost = require("./data/posts.json");
// social-activity
// SfDTW2TI8YieaW9D

// m3M3akVwvFBW97bp

// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.gtaii29.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://social-activity:Kj90XADaigRbeSZa@cluster0.gtaii29.mongodb.net/?retryWrites=true&w=majority`;

const uri =
  "mongodb+srv://social-activity:Kj90XADaigRbeSZa@cluster0.gtaii29.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);
async function run() {
  try {
    //database collection
    const postCollection = client.db("social-activity").collection("posts");

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      console.log(post, result);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);


app.get('/posts', (req, res) => {
  res.send(allPost)
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const result = allPost.find(post => post.id == id);
  res.send(result)
})




app.get("/", (req, res) => {
  res.send("Social Activity Server is Running");
});

app.listen(Port, () => {
  console.log("Social Activity is running", Port);
});
