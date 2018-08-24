const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(process.env.PORT || 4000);
