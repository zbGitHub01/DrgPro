import {Switch,Route} from 'react-router-dom'
import Login from './pages/login';


function App() {
  return (
    <div className="App" style={{height:'100%'}}>
      <Switch>
          <Route path='/login' component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
