const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(`task server running `);
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ysfeeva.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const QuadDBCollection = client.db("InternshalaTask").collection("QuadDB");
    const UserInfoCollection = client.db("linkedInTask").collection("userInfo");
    const SectorsfoCollection = client.db("linkedInTask").collection("sectors");

    app.get("/table", async (req, res) => {
      const query = {};
      const result = await QuadDBCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/userInfo", async (req, res) => {
      const userInfo = req.body;
      console.log(userInfo);
      const result = await UserInfoCollection.insertOne(userInfo);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const user = await UserInfoCollection.find(query).toArray();
      res.send(user);
    });

    app.get("/sectors", async (req, res) => {
      const query = {};
      const sectors = await SectorsfoCollection.find(query).toArray();
      console.log(sectors);

      res.send(sectors);
    });
    app.put("/EditUser", async (req, res) => {
      const newUser = req.body;
      console.log(req.query.id);
      const filter = { _id: ObjectId(req.query.id) };
      const option = { upsert: true };
      const updatedUser = {
        $set: {
          name: newUser?.name,
          sector: newUser?.sector,
          terms: newUser?.terms,
        },
      };
      console.log(updatedUser);
      const result = await UserInfoCollection.updateOne(
        filter,
        updatedUser,
        option
      );
      res.send(result);
      console.log(filter, "and", newUser);
      console.log(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(` Task Server Running on ${port}`);
});
