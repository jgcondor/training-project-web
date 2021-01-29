import { Redirect, Route } from 'react-router-dom';

const Auth = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem('token');

      return token ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
);

export default Auth;
