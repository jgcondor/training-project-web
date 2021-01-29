import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

const NotFound = () => (
  <Grid style={{ height: '100vh' }} textAlign="center" verticalAlign="middle">
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1">
          404 | <small>Not Found</small>
        </Header>
        <Link to="/">Ir al inicio</Link>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NotFound;
