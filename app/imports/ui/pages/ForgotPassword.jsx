import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Segment, Item, Message, Container, Grid, Header } from 'semantic-ui-react';
import React, { useState } from 'react';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';

const ForgotPassword = ({ location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    default:
      // do nothing.
    }
  };

  const submit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
      }
    });
  };

  // Render the forgot password form.
  const { from } = location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to page instead of login screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }

  return (
    <Container id={PAGE_IDS.FORGOT_PASSWORD}
      style={{ paddingLeft: '130px',
        paddingRight: '130px',
        marginTop: '50px',
        marginBottom: '95px' }}>
      <Grid textAlign='center' verticalAlign='middle' centered columns={2}>
        <Grid.Column>
          <br/>
          <Header as='h2' textAlign="center">
            Forgot Password
          </Header>
          <Form onSubmit={submit}>
            <Segment style={{ boxShadow: 'none', border: 'none' }}>
              <Item>
                <Item.Content>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Please enter the email address you'd like your password reset information sent to
                </Item.Content>
              </Item>
              <br/>
              <Form.Input
                label='E-mail Address'
                id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_EMAIL}
                icon='user'
                iconPosition='left'
                name='email'
                type='email'
                focus
                onChange={handleChange}
              />
              <Form.Button id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_SUBMIT} content="Submit" fluid/>
            </Segment>
          </Form>
          {error === '' ? (
            ''
          ) : (
            <Message
              error
              header="Password reset was not successful"
              content={error}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

export default ForgotPassword;
