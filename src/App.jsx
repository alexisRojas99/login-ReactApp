import Index from './components/Index'
import Home from './components/Home'
import Login from './components/Login'
import Admin from './components/Admin'
import Menu from './components/Menu'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route path="/Home" component={Home}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Admin" component={Admin}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;