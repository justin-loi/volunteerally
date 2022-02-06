import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, RadioField } from 'uniforms-semantic';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { signUpNewVolunteerMethod } from '../../api/volunteer/VolunteerProfileCollection.methods';

// username, email, password, timeTracker, dob, firstName, lastName, gender,
// address, city, state, zipCode_postalCode, phoneNumber,
// interests, specialSkills, environmentalPreference, availability
const genderAllowValues = ['Male', 'Female', 'Other', 'Prefer Not to Say'];
const formSchema = new SimpleSchema({
  username: String,
  email: String,
  password: String,
  timeTracker: { type: String, required: false },
  dob: { type: String, allowedValues: genderAllowValues },
  firstName: String,
  lastName: String,
  gender: { type: String, required: false },
  address: String,
  city: String,
  state: String,
  zipCode_postalCode: String,
  phoneNumber: String,
  interests: { type: Array, required: false },
  'interests.$': { type: String, required: false },
  specialSkills: { type: Array, required: false },
  'specialSkills.$': { type: String, required: false },
  environmentalPreference: { type: String, required: false },
  availability: { type: Array, required: false },
  'availability.$': { type: String, required: false },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data, formRef) => {
    signUpNewVolunteerMethod.callPromise(data)
      .catch(error => {
        swal('Error', error.message, 'error');
        console.error(error);
      })
      .then(() => {
        formRef.reset();
        swal({
          title: 'Signed Up',
          text: 'You now have an account. Next you need to login.',
          icon: 'success',
          timer: 1500,
        });
        setRedirectToReferer(false);
      });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.SIGN_UP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
              Register your account
          </Header>

          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <TextField name='username'/>
              <TextField name='email' type='email' label='E-mail' id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}/>
              <TextField name='password' type='password' id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}/>
              <HiddenField name='timeTracker' value='0'/>
              <TextField name='dob' label='Date of Birth'/>
              <div className="two fields">
                <div className="field">
                  <TextField name='firstName' label='First Name' id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}/>
                </div>
                <div className="field">
                  <TextField name='lastName' label='Last Name' id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}/>
                </div>
              </div>
              <RadioField name='gender' allowedValues={genderAllowValues} inline='true'/>
              <TextField name='address'/>
              <div className="two fields">
                <div className="field">
                  <TextField name='city'/>
                </div>
                <div className="field">
                  <TextField name='state'/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <TextField name='zipCode_postalCode' label='Zip/Postal Code'/>
                </div>
                <div className="field">
                  <TextField name='phoneNumber' label='Phone Number'/>
                </div>
              </div>
              <TextField name='interests'/>
              <TextField name='specialSkills' label='Special Skills'/>
              <TextField name='environmentalPreference' label='Environmental Preference'/>
              <TextField name='availability'/>
              <SubmitField value='Sign up' id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}/>
              <ErrorsField />
            </Segment>
          </AutoForm>
          <Message>
              Already have an account? Login <Link to="/signin">here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
