const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://socialActivitis:LEx304HZEg1scxBl@cluster0.nxgxqoq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const postCollection = client.db("social-activitis").collection("posts");

    //send post in db
    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      console.log(result);
      res.send(result);
    });
    //
    app.get("/posts", async (req, res) => {
      const query = {};
      const result = await postCollection
        .find(query, {sort:{_id:-1}})
        .toArray();
      res.send(result);
    });

    //single post for service details com
    app.get('/posts/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await postCollection.findOne(query);
      res.send(result)
    })

    //
    // app.get("/services/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const service = await servicesCollection.findOne(query);
    //   res.send(service);
    // });

    //all services
    // app.get("/services", async (req, res) => {
    //   const query = {};
    //   const cursor = servicesCollection.find(query, {sort:{_id:-1}});
    //   const services = await cursor.toArray();
    //   res.send(services);
    // });
  } finally {
  }
}
run().catch((error) => console.log(error));

console.log(uri);

app.get("/", (req, res) => {
  res.send("Social activity database");
});

app.listen(port, () => {
  console.log(`social activity database running ${port}`);
});

// const allPost = require("./data/posts.json");

// app.get("/posts", (req, res) => {
//   res.send(allPost);
// });

// app.get("/post-details/:id", (req, res) => {
//   const id = req.params.id;
//   const result = allPost.find((post) => post.id == id);
//   res.send(result);
// });
