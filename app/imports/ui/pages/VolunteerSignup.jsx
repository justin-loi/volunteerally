import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Volunteers } from '../../api/volunteer/VolunteerCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const VolunteerSignup = ({ location }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [dateOfBirth, setDateOfBrith] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // volunteer information/date
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode_postalCode, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [interests, setInterests] = useState([]);
  const [specialSkills, setSpecialSkills] = useState([]);
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [availability, setAvailability] = useState([]);
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  // Array(arraySize).fill(value);
  const [isValueEmpty, setIsValueEmpty] = useState(Array(13).fill(true));

  function setIsValueEmptyHelper(index, value) {
    isValueEmpty[index] = value;
    setIsValueEmpty(isValueEmpty);
  }

  // reference: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  function isValidDate(dateString) {
    // declare and initialize variables
    const today = new Date();
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      setError('Please enter the correct date format mm/dd/yyyy');
      setIsValueEmptyHelper(4, true);
      swal('Error!', 'Please enter the correct date format mm/dd/yyyy', 'error');
      return false;
    }
    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < (today.getFullYear() - 300) || year > today.getFullYear() || month === 0 || month > 12) {
      setError('Invalid date');
      setIsValueEmptyHelper(4, true);
      swal('Error!', 'Invalid date', 'error');
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
      setIsValueEmptyHelper(4, true);
      swal('Error!', 'Invalid date', 'error');
      return false;
    }

    // Checks are volunteers over 16
    if ((today.getFullYear() - year) <= 16) {
      if ((today.getFullYear() - year) === 16 && today.getMonth() > month) {
        return true;
      }
      setError('You must be at least 16 years old to join Volunteer Ally');
      setIsValueEmptyHelper(4, true);
      swal('Sorry', 'You must be at least 16 years old to join Volunteer Ally', 'warning');
      return false;
    }
    return true;
  }

  // Check password
  function checkPassword(p1, p2) {
    if (p1 === p2) {
      return true;
    }
    setError('Please make sure the both passwords match');
    setIsValueEmptyHelper(3, true);
    swal('Error!', 'Please make sure the both passwords match', 'error');
    return false;
  }

  // checkbox helper function
  function checkboxHelper(array, value) {
    // Reference: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    return array;
  }

  function isNotEmpty(value) {
    return (!value);
  }

  function letterOnly(value) {
    return /^[a-zA-Z]+$/.test(value);
  }

  function numberOnly(value) {
    return /^[0-9]+$/.test(value);
  }

  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setIsValueEmptyHelper(0, isNotEmpty(value));
      setEmail(value);
      break;
    case 'username':
      setIsValueEmptyHelper(1, isNotEmpty(value));
      setUsername(value);
      break;
    case 'password':
      setIsValueEmptyHelper(2, isNotEmpty(value));
      setPassword(value);
      break;
    case 'confirmPassword':
      setIsValueEmptyHelper(3, isNotEmpty(value));
      setConfirmPassword(value);
      break;
    case 'dateOfBirth':
      setIsValueEmptyHelper(4, isNotEmpty(value));
      setDateOfBrith(value);
      break;
    case 'firstName':
      setIsValueEmptyHelper(5, isNotEmpty(value));
      setfirstName(value);
      break;
    case 'lastName':
      setIsValueEmptyHelper(6, isNotEmpty(value));
      setlastName(value);
      break;
    case 'gender':
      setGender(value);
      break;
    case 'address':
      setIsValueEmptyHelper(7, isNotEmpty(value));
      setAddress(value);
      break;
    case 'city':
      setIsValueEmptyHelper(8, isNotEmpty(value));
      setCity(value);
      if (!letterOnly(value)) {
        setIsValueEmptyHelper(8, true);
      }
      break;
    case 'state':
      setIsValueEmptyHelper(9, isNotEmpty(value));
      setState(value);
      if (!letterOnly(value)) {
        setIsValueEmptyHelper(9, true);
      }
      break;
    case 'zipCode_postalCode':
      setIsValueEmptyHelper(10, isNotEmpty(value));
      setCode(value);
      break;
    case 'phoneNumber':
      setIsValueEmptyHelper(11, isNotEmpty(value));
      setPhoneNumber(value);
      if (!numberOnly(value)) {
        setIsValueEmptyHelper(11, true);
      }
      break;
    case 'interests':
      setInterests(checkboxHelper(interests, value));
      // console.log(interests);
      break;
    case 'specialSkills':
      setSpecialSkills(checkboxHelper(specialSkills, value));
      // console.log(specialSkills);
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      // console.log(environmentalPreference);
      break;
    case 'availability':
      setAvailability(checkboxHelper(availability, value));
      // console.log(availability);
      break;
    case 'privacyPolicy':
      setIsValueEmptyHelper(12, isNotEmpty(value));
      if (privacyPolicy === '') {
        setPrivacyPolicy(value);
      } else {
        setPrivacyPolicy('');
      }
      break;
    default:
      // do nothing.
    }
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    if (!isValueEmpty.includes(true)) {
      if (isValidDate(dateOfBirth) && checkPassword(password, confirmPassword)) {
        Accounts.createUser({ email, username, password }, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            // Accounts.createUser doesn't add the user to the USER role, the next line is to fix the problem.
            Meteor.call('fixVolunteerRole');
            const owner = Meteor.user().username;
            const collectionName = Volunteers.getCollectionName();
            const definitionData = {
              owner, firstName, lastName, gender, address, city, state, zipCode_postalCode, phoneNumber,
              interests, specialSkills, environmentalPreference, availability,
            };
            defineMethod.callPromise({ collectionName, definitionData })
              .catch(() => swal('Error', error.message, 'error'))
              .then(() => {
                swal('Success', 'Welcome!', 'success');
              });
            setError('');
            setRedirectToReferer(true);
          }
        });
      }
    } else {
      setError('Please fill in all red boxes');
      swal('Error!', 'Please fill in all red boxes', 'error');
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
                label="E-mail Address"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_EMAIL}
                icon="mail"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={handleChange}
                error={ isValueEmpty[0] }
              />
              <Form.Input
                label="Username"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_USERNAME}
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                error={ isValueEmpty[1] }
              />
              <Form.Input
                label="Password"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                error={ isValueEmpty[2] }
              />
              <Form.Input
                label="Confirm Password"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CONFIRM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                error={ isValueEmpty[3] }
              />
              <Form.Input
                label="Date Of Birth (You must be at least 16 years old to join Volunteer Ally)"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_BIRTH}
                icon="calendar alternate outline"
                iconPosition="left"
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                onChange={handleChange}
                error={ isValueEmpty[4] }
              />
              <Form.Group widths='equal'>
                <Form.Input
                  label="First Name"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_FIRST}
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  error={ isValueEmpty[5] }
                />
                <Form.Input
                  label="Last Name"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_LAST}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  error={ isValueEmpty[6] }
                />
              </Form.Group>
              <Form.Group inline>
                <label>Gender: </label>
                <Form.Radio
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_MALE}
                  label='Male'
                  name='gender'
                  value='Male'
                  checked={gender === 'Male'}
                  onChange={handleChange}
                />
                <Form.Radio
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_FEMALE}
                  label='Female'
                  name='gender'
                  value='Female'
                  checked={gender === 'Female'}
                  onChange={handleChange}
                />
                <Form.Radio
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_OTHER}
                  label='Other'
                  name='gender'
                  value='Other'
                  checked={gender === 'Other'}
                  onChange={handleChange}
                />
                <Form.Radio
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_NO_SAY}
                  label='Prefer Not to Say'
                  name='gender'
                  value='Prefer Not to Say'
                  checked={gender === 'Prefer Not to Say'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Input
                label="Primary Address"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ADDRESS}
                icon="thumbtack"
                iconPosition="left"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                error={ isValueEmpty[7] }
              />
              <Grid divided='vertically' style={{ paddingTop: '8px', paddingBottom: '16px' }}>
                <Form.Input
                  label="City"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CITY}
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  error={ isValueEmpty[8] }
                />
                <Form.Input
                  label="State"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_STATE}
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  error={ isValueEmpty[9] }
                />
                <Form.Input
                  label="Zip/Postal Code"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ZIPCODE}
                  name="zipCode_postalCode"
                  placeholder="Zip/Postal Code"
                  onChange={handleChange}
                  error={ isValueEmpty[10] }
                />
                <Form.Input
                  label="Phone Number"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PHONE}
                  icon="phone"
                  iconPosition="left"
                  name="phoneNumber"
                  placeholder="123456789"
                  onChange={handleChange}
                  error={ isValueEmpty[11] }
                />
              </Grid>
              <label style={{ paddingTop: '20px' }}>Interests: </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    <Grid.Column>
                      <Form.Checkbox
                        id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ANIMALS}
                        label='Animal Welfare/Rescue'
                        name='interests'
                        value='Animal Welfare/Rescue'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Child/Family Support'
                        name='interests'
                        value='Child/Family Support'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='COVID-19 Recovery'
                        name='interests'
                        value='COVID-19 Recovery'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Crisis/Disaster Relief'
                        name='interests'
                        value='Crisis/Disaster Relief'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Education'
                        name='interests'
                        value='Education'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Environment'
                        name='interests'
                        value='Environment'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Elderly/Senior Care'
                        name='interests'
                        value='Elderly/Senior Care'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Food Banks'
                        name='interests'
                        value='Food Banks'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Housing'
                        name='interests'
                        value='Housing'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Homelessness/Poverty'
                        name='interests'
                        value='Homelessness/Poverty'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Special Needs'
                        name='interests'
                        value='Special Needs'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <label style={{ paddingTop: '20px' }}>Special Skills (optional): </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    <Grid.Column>
                      <Form.Checkbox
                        id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_AGRICULTURE}
                        label='Agriculture'
                        name='specialSkills'
                        value='Agriculture'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Construction'
                        name='specialSkills'
                        value='Construction'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Education'
                        name='specialSkills'
                        value='Education'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Engineering'
                        name='specialSkills'
                        value='Engineering'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Event Planning'
                        name='specialSkills'
                        value='Event Planning'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Sales/Marketing'
                        name='specialSkills'
                        value='Sales/Marketing'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Technology'
                        name='specialSkills'
                        value='Technology'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Graphic/Web Design'
                        name='specialSkills'
                        value='Graphic/Web Design'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='CPR (Certification Required)'
                        name='specialSkills'
                        value='CPR'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='First Aid (Certification Required)'
                        name='specialSkills'
                        value='First Aid'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Nursing (CNA/RNA Certified)'
                        name='specialSkills'
                        value='Nursing'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Other'
                        name='specialSkills'
                        value='Other'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <label style={{ paddingTop: '20px' }}>Environmental Preference: </label>
              <Form.Group inline>
                <Form.Radio
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_INDOOR}
                  label='Indoor'
                  name='environmentalPreference'
                  value='Indoor'
                  checked={environmentalPreference === 'Indoor'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='Outdoor'
                  name='environmentalPreference'
                  value='Outdoor'
                  checked={environmentalPreference === 'Outdoor'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='Both'
                  name='environmentalPreference'
                  value='Both'
                  checked={environmentalPreference === 'Both'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='No Preference'
                  name='environmentalPreference'
                  value='No Preference'
                  checked={environmentalPreference === 'No Preference'}
                  onChange={handleChange}
                />
              </Form.Group>
              <label>Availability: </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    <Grid.Column>
                      <Form.Checkbox
                        label='One-Time'
                        name='availability'
                        value='One-Time'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_MONTHLY}
                        label='Once a month'
                        name='availability'
                        value='Once a month'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Once a week'
                        name='availability'
                        value='Once a week'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='1-3 times a week'
                        name='availability'
                        value='1-3 times a week'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='More than 3 times a week'
                        name='availability'
                        value='More than 3 times a week'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Weekends Only'
                        name='availability'
                        value='Weekends Only'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Weekdays only'
                        name='availability'
                        value='Weekdays only'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <Form.Checkbox
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_POLICY}
                label='Please confirm that you agree to our privacy policy'
                name = 'privacyPolicy'
                value = 'agree'
                onChange={handleChange}
                error={ isValueEmpty[12] }
              />
              <Form.Button id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_SUBMIT} content="Submit" />
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
