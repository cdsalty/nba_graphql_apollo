import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "./App.css";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

// Suggested wayt to start buiding your API for error handling?
const link = from([
  errorLink,
  new HttpLlink({ uri: "http://localhost:5000/graphql" })
]);

// to create connection
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const App = () => {
  return (
    <div className="App">
      <h1>Working</h1>
      <h4>Ready to setup Apollo Boiler Plate</h4>
    </div>
  );
};

export default App;
