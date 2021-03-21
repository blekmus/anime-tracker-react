import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import SearchPage from './pages/search-page'
import UserPage from './pages/user-page'

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>

          <Route exact path="/">
            <SearchPage />
          </Route>

          <Route path="/:user">
            <UserPage />
          </Route>

        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
