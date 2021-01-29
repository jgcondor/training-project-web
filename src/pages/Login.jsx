import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

import * as auth from '../services/auth';

const initialForm = {
  email: '',
  password: ''
};

const Login = ({ history }) => {
  const [form, setForm] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { email, password } = form;

  const handleChange = (e, { name, value }) =>
    setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    const fields = [];

    if (!email || !email.trim()) {
      fields.push('Email field is required');
    }

    if (!password || !password.trim()) {
      fields.push('Password field is required');
    }

    if (fields.length) {
      setErrors(fields);
      return;
    }

    setFormLoading(true);

    try {
      const {
        data: { login },
        errors
      } = await auth.login(email, password);

      if (errors) {
        setErrors(errors.map(err => err.message));
      }

      setFormLoading(false);

      if (login) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: login.name,
            email: login.email
          })
        );

        localStorage.setItem('token', login.token);
        history.push('/');
      }
    } catch (error) {
      setFormLoading(false);
      setErrors([error.message]);
    }
  };

  return (
    <Grid style={{ height: '100vh' }} textAlign='center' verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Calendar App
          </Header>
          <Form size='large' onSubmit={handleSubmit} loading={formLoading}>
            <Segment stacked>
              <Form.Input
                type='email'
                fluid
                icon='at'
                iconPosition='left'
                placeholder='Email address'
                name='email'
                value={email}
                onChange={handleChange}
              />

              <Form.Input
                type='password'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleChange}
              />

              <Button fluid color='black' size='large'>
                Login
              </Button>

              <Divider horizontal>Or</Divider>

              <Link to='/register'>Go to register</Link>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message
              error
              header='There was some errors with your submission'
              list={errors}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
