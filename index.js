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

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ysfeeva.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
  try{
  

  }
  finally{}
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(` Task Server Running on ${port}`);
});
