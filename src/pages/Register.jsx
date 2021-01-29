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
  name: '',
  email: '',
  password: '',
  password_c: ''
};

const Login = ({ history }) => {
  const [form, setForm] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { name, email, password, password_c } = form;

  const handleChange = (e, { name, value }) =>
    setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    const fields = [];

    if (!name || !name.trim()) {
      fields.push('Name field is required');
    }

    if (!email || !email.trim()) {
      fields.push('Email field is required');
    }

    if (!password || !password.trim()) {
      fields.push('Password field is required');
    }

    if (password !== password_c) {
      fields.push('Password field no match');
    }

    if (fields.length) {
      setErrors(fields);
      return;
    }

    setFormLoading(true);

    try {
      const {
        data: { register },
        errors
      } = await auth.register(name, email, password);

      if (errors) {
        setErrors(errors.map(err => err.message));
      }

      setFormLoading(false);

      if (register) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: register.name,
            email: register.email
          })
        );

        localStorage.setItem('token', register.token);
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
                type='text'
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Full name'
                name='name'
                value={name}
                onChange={handleChange}
              />

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

              <Form.Input
                type='password'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm password'
                name='password_c'
                value={password_c}
                onChange={handleChange}
              />

              <Button fluid color='black' size='large'>
                Register
              </Button>

              <Divider horizontal>Or</Divider>

              <Link to='/login'>Go to login</Link>
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
