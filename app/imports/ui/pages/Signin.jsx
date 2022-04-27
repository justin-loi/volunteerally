import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Container, Form, Grid, Header, Item, Message, Segment } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */

const Signin = ({ location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'rememberMe':
      setRememberMe(true);
      break;
    default:
      // do nothing.
    }
  };

  // Handle Signin submission using Meteor's account mechanism.
  const submit = () => {
    const RememberMeVal = rememberMe;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        if (RememberMeVal === false) {
          Accounts._unstoreLoginToken();
          Accounts._autoLoginEnabled = false;
        }
        setRedirectToReferer(true);
      }
    });

  };

  // Render the signin form.
  const { from } = location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to page instead of login screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  // Otherwise return the Login form.
  return (
    <Container id={PAGE_IDS.SIGN_IN}
      style={{ paddingLeft: '130px',
        paddingRight: '130px',
        marginTop: '50px',
        marginBottom: '95px' }}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <br/>
          <Header as="h2" textAlign="center">
            Sign In
          </Header>
          <Form onSubmit={submit}>
            <Segment style={{ boxShadow: 'none', border: 'none' }}>
              <Form.Input
                label="Username"
                id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL}
                icon="user"
                iconPosition="left"
                name="email"
                type="email"
                focus
                onChange={handleChange}
              />
              <Form.Input
                label="Password"
                id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                focus
                onChange={handleChange}
              />
              <br/>
              <Form.Button id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} content="Submit" fluid/>
              <Form.Checkbox
                label="Remember me"
                name="rememberMe"
                onChange={handleChange}
              />
              <br/>
              <br/>
              <Grid textAlign="center">
                <Item>
                  <Item.Content>
                  Not registered? Click here to <Link to="/volunteer_signup">Register</Link>
                  </Item.Content>
                </Item>
              </Grid>
            </Segment>
          </Form>
          {error === '' ? (
            ''
          ) : (
            <Message
              error
              header="Login was not successful"
              content={error}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};

export default Signin;
