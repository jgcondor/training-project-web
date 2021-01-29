import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './middlewares/Auth';

import Login from './pages/Login';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App = () => (
  <Router>
    <Switch>
      <Auth exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route path='*' component={NotFound} />
    </Switch>
  </Router>
);

export default App;
