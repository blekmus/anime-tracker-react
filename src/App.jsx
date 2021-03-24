import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const SearchPage = lazy(() => import('./pages/search-page'))
const UserPage = lazy(() => import('./pages/user-page'))

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<div style={{ backgroundColor: '#0b1622' }} />}>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route path="/:user" component={UserPage} />
          </Switch>
        </Suspense>
      </Router>
    </ApolloProvider>
  )
}

export default App
