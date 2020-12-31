import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"; // to handle errors
import Games from "./Components/Games";
import "./App.css";

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
      <Games />
    </ApolloProvider>
  );
};

export default App;
