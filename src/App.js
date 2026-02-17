import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute path="/" component={Home} />
  </Switch>
)

export default App
