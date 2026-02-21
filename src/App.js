import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Account from './components/Account'
import Popular from './components/Popular'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <Route component={NotFound} />
  </Switch>
)

export default App
