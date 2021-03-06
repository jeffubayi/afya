import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Header/>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
