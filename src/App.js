import {Switch,Route,Redirect} from 'react-router-dom'
import Login from './pages/login';
import Home from './component/home'


function App() {
  return (
    <div className="App" style={{height:'100%'}}>   
      <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/home' component={Home}></Route>
          <Redirect to='/home'/>
      </Switch>
    </div>
  );
}

export default App;
