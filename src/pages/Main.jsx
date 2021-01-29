import { useEffect, useState } from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';

import Calendar from '../components/Calendar';

const Main = ({ history }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('user');
    setUser(JSON.parse(data));
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div>
      <Menu size='huge' inverted>
        <Container>
          <Menu.Item position='left'>Calendar App</Menu.Item>
          <Menu.Item position='right'>
            {user.name}
            <Icon
              name='power off'
              link
              style={{ marginLeft: '16px' }}
              onClick={logout}
            />
          </Menu.Item>
        </Container>
      </Menu>

      <Container>
        <Calendar />
      </Container>
    </div>
  );
};

export default Main;
