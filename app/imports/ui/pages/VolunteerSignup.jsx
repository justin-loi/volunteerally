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

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
      }
    });
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
              <Form.Group widths='equal'>
                <Form.Input
                  label="First Name"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_FIRST}
                  name="first_name"
                  type="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Last Name"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_LAST}
                  name="last_name"
                  type="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Input
                label="E-mail Address"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_EMAIL}
                icon="mail"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={handleChange}
              />
              <Form.Input
                label="Birth Date (You must be at least 16 years old to join Volunteer Ally)"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_BRITH}
                icon="calendar alternate outline"
                iconPosition="left"
                name="birth"
                type="birth"
                placeholder="mmddyyyy"
                onChange={handleChange}
              />
              <Form.Group inline>
                <label>Gender: </label>
                <Form.Radio
                  label='Male'
                  name='male'
                  value='male'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Female'
                  name='female'
                  value='female'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Other'
                  name='other'
                  value='other'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Prefer Not to Say'
                  name='not_to_say'
                  value='not_to_say'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                label="Primary Address"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ADDRESS}
                icon="thumbtack"
                iconPosition="left"
                name="address"
                placeholder="Address"
                type="address"
                onChange={handleChange}
              />
              <Grid divided='vertically'>
                <Form.Input
                  label="City"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CITY}
                  name="city"
                  type="city"
                  placeholder="City"
                  onChange={handleChange}
                />
                <Form.Input
                  label="State"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_STATE}
                  name="state"
                  type="state"
                  placeholder="State"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Zip/Postal Code"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ZIPCODE}
                  name="zip_postal_code"
                  type="zip_postal_code"
                  placeholder="Zip/Postal Code"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Phone Number"
                  id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PHONE}
                  icon="phone"
                  iconPosition="left"
                  name="phone_number"
                  type="phone_number"
                  placeholder="123456789"
                  onChange={handleChange}
                />
              </Grid>
              <br></br>
              <Form.Input
                label="Username"
                id={COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_USERNAME}
                icon="user"
                iconPosition="left"
                name="user"
                type="user"
                placeholder="Username"
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
                name="password"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
              />
              <label>Interests: </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row >
                    <Grid.Column>
                      <Form.Checkbox
                        label='Animal Welfare/Rescue'
                        name='animal_welfare_rescue'
                        value='animal_welfare_rescue'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Child/Family Support'
                        name='child_family_support'
                        value='child_family_support'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='COVID-19 Recovery'
                        name='covid-19_recovery'
                        value='covid-19_recovery'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Crisis/Disaster Relief'
                        name='crisis_disaster_relief'
                        value='crisis_disaster_relief'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Education'
                        name='education'
                        value='education'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Environment'
                        name='environment'
                        value='environment'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Elderly/Senior Care'
                        name='elderly_senior_care'
                        value='elderly_senior_care'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Food Banks'
                        name='food_banks'
                        value='food_banks'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Housing'
                        name='housing'
                        value='housing'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Homelessness/Poverty'
                        name='homelessness_poverty'
                        value='homelessness_poverty'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Special Needs'
                        name='special_needs'
                        value='special_needs'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <br></br>
              <label>Special Skills (optional): </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row >
                    <Grid.Column>
                      <Form.Checkbox
                        label='Agriculture'
                        name='agriculture'
                        value='agriculture'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Construction'
                        name='construction'
                        value='construction'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Education'
                        name='education'
                        value='education'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Engineering'
                        name='engineering'
                        value='engineering'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Event Planning'
                        name='event_planning'
                        value='event_planning'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Sales/Marketing'
                        name='sales_marketing'
                        value='sales_marketing'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Technology'
                        name='technology'
                        value='technology'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Graphic/Web Design'
                        name='graphic_web_design'
                        value='graphic_web_design'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='CPR (Certification Required)'
                        name='cpr'
                        value='cpr'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='First Aid (Certification Required)'
                        name='first_aid'
                        value='first_aid'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Nursing (CNA/RNA Certified)'
                        name='nursing'
                        value='nursing'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Other'
                        name='other'
                        value='other'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <br></br>
              <label>Environmental Preference: </label>
              <Form.Group inline>
                <Form.Radio
                  label='Indoor'
                  name='indoor'
                  value='indoor'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Outdoor'
                  name='outdoor'
                  value='outdoor'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Both'
                  name='both'
                  value='both'
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='No Preference'
                  name='no_preference'
                  value='no_preference'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <label>Availability: </label>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row >
                    <Grid.Column>
                      <Form.Checkbox
                        label='One-Time'
                        name='one-time'
                        value='one-time'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Once a month'
                        name='once_a_month'
                        value='once_a_month'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Once a week'
                        name='once_a_week'
                        value='once_a_week'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='1-3 times a week'
                        name='one_to_three_times'
                        value='one_to_three_times'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='More than 3 times a week'
                        name='more_than_three'
                        value='more_than_three'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Weekends Only'
                        name='weekends_only'
                        value='weekends_only'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Checkbox
                        label='Weekdays only'
                        name='weekdays_only'
                        value='weekdays_only'
                        onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
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
