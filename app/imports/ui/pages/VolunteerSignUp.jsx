import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment, Form, Loader } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { signUpNewVolunteerMethod } from '../../api/volunteer/VolunteerProfileCollection.methods';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { Availabilities } from '../../api/availability/AvailabilityCollection';

const genderAllowValues = ['Male', 'Female', 'Other', 'Prefer Not to Say'];
const genderComponentID = [COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_MALE, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_FEMALE,
  COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_OTHER, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_NO_SAY];

const formSchema = new SimpleSchema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  username: { type: String, optional: true },
  gender: { type: String, optional: true },
  dob: { type: String, optional: true },
  address: { type: String, optional: true },
  city: { type: String, optional: true },
  state: { type: String, optional: true },
  code: { type: String, optional: true },
  phoneNumber: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * VolunteerSignUp component is similar to signin component, but we create a new volunteer instead.
 */
const VolunteerSignUp = ({ location, ready, interestsArray, skillsArray, environmentalArray, availabilitiesArray }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]);
  const [specialSkills, setSpecialSkills] = useState([]);
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [availability, setAvailability] = useState([]);
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  // Array(arraySize).fill(value)
  const [isValueEmpty, setIsValueEmpty] = useState(Array(2).fill(false));

  const checkPassword = (p1, p2) => {
    if (p1 === p2) {
      return true;
    }
    swal('Error!', 'Your passwords do not match', 'error');
    return false;
  };

  // reference: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  const validateEmail = (email) => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  const checkEmail = (email) => {
    if (validateEmail(email)) {
      return true;
    }
    swal('Error!', 'Please enter a valid email ', 'error');
    return false;
  };

  const numberOnly = (value) => {
    if (/^[0-9]+$/.test(value)) {
      return true;
    }
    swal('Error!', 'Zip/Postal Code and Phone Numbers should be number only ', 'error');
    return false;
  };

  const isNotEmpty = (value) => (!value);

  const agreePolicyAndTerm = (value) => {
    if (!value || value === '') {
      swal('Error!', 'Please confirm that you agree to our Privacy Policy and Term & Conditions', 'error');
      return false;
    }
    return true;
  };

  const setIsValueEmptyHelper = (index, value) => {
    isValueEmpty[index] = value;
    setIsValueEmpty(isValueEmpty);
  };

  const checkboxHelper = (array, value) => {
    // Reference: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    return array;
  };

  // reference: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  const isValidDate = (dateString) => {
    // declare and initialize variables
    const today = new Date();
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      setIsValueEmptyHelper(0, true);
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
      setIsValueEmptyHelper(0, true);
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
      setIsValueEmptyHelper(0, true);
      swal('Error!', 'Invalid date', 'error');
      return false;
    }

    // Checks are volunteers over 16
    if ((today.getFullYear() - year) <= 16) {
      if ((today.getFullYear() - year) === 16 && today.getMonth() >= month) {
        return true;
      }
      setIsValueEmptyHelper(0, true);
      swal('Sorry', 'You must be at least 16 years old to join Volunteer Ally', 'warning');
      return false;
    }
    return true;
  };

  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'dateOfBirth':
      setIsValueEmptyHelper(0, isNotEmpty(value));
      setDateOfBirth(value);
      break;
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'gender':
      setGender(value);
      break;
    case 'interests':
      setInterests(checkboxHelper(interests, value));
      break;
    case 'specialSkills':
      setSpecialSkills(checkboxHelper(specialSkills, value));
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      break;
    case 'availability':
      setAvailability(checkboxHelper(availability, value));
      break;
    case 'privacyPolicy':
      if (privacyPolicy === '') {
        setPrivacyPolicy(value);
        setIsValueEmptyHelper(1, false);
      } else {
        setPrivacyPolicy('');
        setIsValueEmptyHelper(1, true);
      }
      break;
    default:
        // do nothing.
    }
  };

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data, formRef) => {
    if (isValidDate(data.dob) && checkPassword(data.password, confirmPassword)
        && agreePolicyAndTerm(privacyPolicy) && checkEmail(data.email) &&
        numberOnly(data.code) && numberOnly(data.phoneNumber)) {
      // eslint-disable-next-line no-param-reassign
      data.interests = interests;
      // eslint-disable-next-line no-param-reassign
      data.skills = specialSkills;
      // eslint-disable-next-line no-param-reassign
      data.environmental = environmentalPreference;
      // eslint-disable-next-line no-param-reassign
      data.availabilities = availability;
      signUpNewVolunteerMethod.callPromise(data)
        .catch(error => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          // Not sure why it catches the error but still executes
          formRef.reset();
          setGender('');
          setInterests([]);
          setSpecialSkills([]);
          setEnvironmentalPreference('');
          setAvailability([]);
          swal({
            title: 'Signed Up',
            text: 'You now have an account. Next you need to login.',
            icon: 'success',
            timer: 1500,
          });
          setRedirectToReferer(true);
        });
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.VOLUNTEER_SIGNUP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Volunteer Sign Up Form
          </Header>

          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <TextField name='username' placeholder='Username' iconLeft='user'
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_USERNAME}/>
              <TextField name='email' type='email' label='E-mail Address' placeholder='E-mail Address' iconLeft='mail'
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_EMAIL}/>
              <TextField name='password' type='password' placeholder='Password' iconLeft='lock' id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PASSWORD}/>
              <Form.Input
                label="Confirm Password"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CONFIRM_PASSWORD}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                icon='lock'
                iconPosition='left'
                required
                onChange={handleChange}
              />
              <HiddenField name='dob' label='Date of Birth (You must be at least 16 years old to join Volunteer Ally)' value={dateOfBirth} />
              <Form.Input
                label="Date Of Birth (You must be at least 16 years old to join Volunteer Ally)"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_BIRTH}
                icon="calendar alternate outline"
                iconPosition="left"
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                onChange={handleChange}
                required
                error={ isValueEmpty[0] }
              />
              <div className="two fields">
                <div className="field">
                  <TextField name='firstName' label='First Name' placeholder='First Name' id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_FIRST}/>
                </div>
                <div className="field">
                  <TextField name='lastName' label='Last Name' placeholder='Last Name' id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_LAST}/>
                </div>
              </div>
              <HiddenField name='gender' value={gender}/>
              <Form.Group inline>
                <label>Gender </label>
                {genderAllowValues.map((value, index) => (
                  <Form.Radio
                    key={`volunteer-signup-gender-${index}`}
                    id={genderComponentID[index]}
                    label={value}
                    name='gender'
                    value={value}
                    checked={gender === value}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
              <TextField name='address' placeholder='1234 Example Street' iconLeft='map marker alternate'
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ADDRESS}/>
              <div className="two fields">
                <div className="field">
                  <TextField name='city' placeholder='Honolulu' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CITY}/>
                </div>
                <div className="field">
                  <TextField name='state' placeholder='Hawaii' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_STATE}/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <TextField name='code' placeholder='96822' label='Zip/Postal Code' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ZIPCODE}/>
                </div>
                <div className="field">
                  <TextField name='phoneNumber' placeholder='18081234567' label='Phone Number' iconLeft='phone'
                    id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PHONE}/>
                </div>
              </div>
              <label style={{ paddingTop: '20px' }}>Interests </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    {interestsArray.map((interest, index) => (
                      <Grid.Column key={`volunteer-signup-grid-interests-${index}`}>
                        <Form.Checkbox
                          key={`volunteer-signup-interests-${interest._id}`}
                          id={`volunteer-signup-interests-${index}`}
                          label={interest.name}
                          name='interests'
                          value={interest._id}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <label style={{ paddingTop: '20px' }}>Special Skills (optional) </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    {skillsArray.map((skill, index) => (
                      <Grid.Column key={`volunteer-signup-grid-skills-${index}`}>
                        <Form.Checkbox
                          key={`volunteer-signup-skill-${skill._id}`}
                          id={`volunteer-signup-skill-${index}`}
                          label={skill.name}
                          name='specialSkills'
                          value={skill._id}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <label>Environmental Preference </label>
              <Form.Group inline>
                {environmentalArray.map((environmental, index) => (
                  <Form.Radio
                    key={`volunteer-signup-environmental-preference-${environmental._id}`}
                    id={`volunteer-signup-environmental-preference-${index}`}
                    label={environmental.name}
                    name='environmentalPreference'
                    value={environmental._id}
                    checked={environmentalPreference === environmental._id}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
              <label style={{ paddingTop: '20px' }}>Availability </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    {availabilitiesArray.map((ava, index) => (
                      <Grid.Column key={`volunteer-signup-grid-availability-${index}`}>
                        <Form.Checkbox
                          key={`volunteer-signup-availability-${ava._id}`}
                          id={`volunteer-signup-availability-${index}`}
                          label={ava.name}
                          name='availability'
                          value={ava._id}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <Link to="/privacy" target="_blank" >Privacy Policy</Link>
              <br/>
              <Link to="/terms" target="_blank" >Term & Conditions</Link>
              <Form.Checkbox
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_POLICY}
                label='Please confirm that you agree to our Privacy Policy and Term & Conditions'
                name = 'privacyPolicy'
                value = 'agree'
                onChange={handleChange}
                error={ isValueEmpty[1] }
              />
              <SubmitField value='Sign up' id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_SUBMIT}/>
              <ErrorsField />
            </Segment>
          </AutoForm>
          <Message>
              Already have an volunteer? Login <Link to="/signin">here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
VolunteerSignUp.propTypes = {
  location: PropTypes.object,
  interestsArray: PropTypes.array.isRequired,
  skillsArray: PropTypes.array.isRequired,
  environmentalArray: PropTypes.array.isRequired,
  availabilitiesArray: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription1 = Interests.subscribe();
  const subscription2 = SpecialSkills.subscribe();
  const subscription3 = Environmental.subscribe();
  const subscription4 = Availabilities.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
  // Get the document
  const interestsArray = Interests.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  const availabilitiesArray = Availabilities.find({}, {}).fetch();
  return {
    interestsArray,
    skillsArray,
    environmentalArray,
    availabilitiesArray,
    ready,
  };
})(VolunteerSignUp);
