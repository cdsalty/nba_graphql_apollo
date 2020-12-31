const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = requires("cors");

const app = express();

app.use(cors());

// tells express to use the graphqlHTTP module which will reference the schema file and that we want to use the graphiql interface. http://localhost:5000/graphql for the graphiql interface
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
