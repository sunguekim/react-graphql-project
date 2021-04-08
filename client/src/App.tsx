import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import './App.css';
import Users from './components/Users';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing';
import { setContext } from 'apollo-link-context'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import IsAuthenticated from './components/IsAuthenticated';

const httpLink = new HttpLink({ uri: "http://localhost:4000" })
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token")

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <IsAuthenticated>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/profile">
              <Profile/>
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
