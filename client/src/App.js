import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from
} from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { onError } from "@apollo/client/link/error"; // to handle errors
import Games from "./Components/Games";
import Team from "./Components/Team";
import "./App.css";
import NavBar from "./Components/NavBar";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

// Suggested wayt to start buiding your API for error handling?
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" })
]);

// to create connection
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <div className="container">
          <Route exact path="/" component={Games} />
          <Route exact path="/teams/:id" component={Team} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;

/*
Previous setup before adding the router
return (
    <ApolloProvider client={client}>
      <div className="container">
        <p>HomePage</p>
        <Games />
      </div>
    </ApolloProvider>
  );


*/
