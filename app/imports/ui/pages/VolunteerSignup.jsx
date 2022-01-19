import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const VolunteerSignup = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [dateOfBirth, setDateOfBrith] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // reference: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  function isValidDate(dateString) {
    // declare and initialize variables
    const today = new Date();
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      setError('Please enter the correct date format mm/dd/yyyy');
      return false;
    }
    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < (today.getFullYear() - 600) || year > (today.getFullYear() + 600) || month === 0 || month > 12) {
      setError('Invalid date');
      return false;
    }
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }
    // Check the range of the day
    if (day < 0 && day >= monthLength[month - 1]) {
      setError('Invalid date');
      return false;
    }
    // Checks are volunteers over 16
    if ((today.getFullYear() - year) <= 16) {
      if (today.getMonth() <= month) {
        if (today.getDate() < day) {
          setError('You must be at least 16 years old to join Volunteer Ally');
          return false;
        }
      }
    }
    return true;
  }

  // Check password
  function checkPassword(p1, p2) {
    if (p1 === p2) {
      return true;
    }
    setError('Please make sure the both passwords match');
    return false;
  }

  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'dateOfBirth':
      setDateOfBrith(value);
      break;
    default:
      // do nothing.
    }
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    if (isValidDate(dateOfBirth) && checkPassword(password, confirmPassword)) {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          setError(err.reason);
        } else {
          setError('');
          setRedirectToReferer(true);
        }
      });
    }
  };

  /* const gender options drop list */

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  return (
    <Container id={PAGE_IDS.VOLUNTEER_SIGNUP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Volunteer Sign Up Form
          </Header>
          <Form onSubmit={submit}>
            <Segment stacked>
              <Form.Input
                label="E-mail Address (username)"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_EMAIL}
                icon="mail"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={handleChange}
              />
              <Form.Input
                label="Password"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
              />
              <Form.Input
                label="Confirm Password"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
              />
              <Form.Input
                label="Date Of Birth (You must be at least 16 years old to join Volunteer Ally)"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_BRITH}
                icon="calendar alternate outline"
                iconPosition="left"
                name="dateOfBirth"
                type="dateOfBirth"
                placeholder="mm/dd/yyyy"
                onChange={handleChange}
              />
              <Form.Button id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} content="Submit" />
            </Segment>
          </Form>
          <Message>
            Already have an account? Login <Link to="/signin">here</Link>
          </Message>
          {error === '' ? (
            ''
          ) : (
            <Message
              error
              header="Registration was not successful"
              content={error}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
VolunteerSignup.propTypes = {
  location: PropTypes.object,
};

export default VolunteerSignup;
