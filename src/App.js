import {Switch,Route} from 'react-router-dom'
import Login from './pages/login';
import Home from './pages/navbar'


function App() {
  return (
    <div className="App" style={{height:'100%'}}>   
      <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
