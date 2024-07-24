require("dotenv-safe").config({ allowEmptyValues: true });
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const socketIo = require("socket.io");

const signale = require("signale");
const prisma = require("./prisma");
const { PrismaClient } = require("@prisma/client");

let PORT = parseInt(process.env.PORT);
let uri = process.env.DATABASE_URL;
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: "HbqkU@example.com",
        name: "K",
        phone: "0821451561"
      },
    });
    res.send({
      success: true,
      message: "Welcome to Testing",
      version: process.env.VERSION,
      author: "K",
      hello: "WORLD!",
    });
  } catch (e) {
    signale.error("Error", e);
    res.status(500).send({
      success: false,
      message: `${e.name} \n ${e.message} \n ${e.stack}`,
      error: e,
      version: process.env.VERSION,
      author: "K",
      hello: "WORLD!",
    });
  }
});

app.use(require("./router"));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("event", (data) => {});
  socket.on("disconnect", () => {});
});

server.listen(PORT, "0.0.0.0", () => {
  signale.warn(
    "There's might be some deprecated code in this project\n Keep calm and carry on!╰(*°▽°*)╯"
  );
  signale.start("Server running on port " + PORT);
  signale.watch("Be Wise While Coding Dont Fogot To Test All Of It!");
});
