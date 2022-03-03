import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Form, Segment, Checkbox, Radio } from 'semantic-ui-react';
import { AutoForm, TextField, HiddenField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import OrganizationSignupBackground from '../components/OrganizationSignupBackground';

const industryAllowedValues = ['Animal Welfare/Rescue', 'Child/Family Support', 'COVID-19 Recovery', 'Crisis/Disaster Relief',
'Education', 'Environment', 'Elderly/Senior Care', 'Food Banks', 'Housing', 'Homelessness/Poverty', 'Special Needs', 'Other'];

const formSchema = new SimpleSchema({
  email: String,
  ein: String,
  primaryAddress: String,
  city: String,
  state: String,
  zipcode: String,
  industry: { type: String, required: true, allowedValues: industryAllowedValues },
  primaryContactFirstName: String,
  primaryContactLastName: String,
  secondContactFirstName: String,
  secondContactLastName: String,
  primaryContactEmail: String,
  primaryContactPhone: String,
  secondContactEmail: String,
  secondContactPhone: String,
  username: String,
  password: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const OrganizationSignup = ({ location }) => {
  const [industry, acceptIndustry] = useState('');
  const [checkPassword, acceptPassword] = useState('');
  const [checkPrivacyPolicy, acceptPrivacyPolicy] = useState('');

  const isNotEmpty = (value) => (!value);

  const checkIsValueEmpty = (index, value) => {
    isValueEmpty[index] = value;
    checkIsValueEmpty(isValueEmpty);
  }

  // referenced VolunteerSignUp matcher
  const checkEmail = (email) => String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,);

  const confirmEmail = (email) => {
    if(checkEmail(email)) {
      return true;
    } else {
      swal('Error!', 'Please enter a valid email', 'error');
      return false;
    }
  }

  const confirmPassword = (inputOne, inputTwo) => {
    if (inputOne === inputTwo) {
      return true;
    } else {
      swal('Error!', 'Your passwords do not match', 'error');
      return false;
    }
  };

  const verifyPrivacyPolicyAndTermsConditions = (value) => {
    if (!value) {
      swal('Error!', 'Please confirm that you agree to our Privacy Policy and Terms & Conditions','error');
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e, { name, value }) => {
    switch(name) {
      case 'confirmPassword':
        acceptPassword(value);
        break;
      case 'industry':
        acceptIndustry(value);
      case 'checkPrivacyPolicy':
        if (checkPrivacyPolicy === '') {
          acceptPrivacyPolicy(value);
          checkIsValueEmpty(1, false);
        } else {
          checkIsValueEmpty(1, true);
        }
        break;
      default:
        // do nothing
    }
  };

  const submit = (data, formRef) => {
    if (confirmPassword(data.password, checkPassword)
      && verifyPrivacyPolicyAndTermsConditions(checkPrivacyPolicy)
      && confirmEmail(data.email)) {
      // insert Organization Profile Collection method here
      .registerNewOrganizationMethod.callPromise(data).catch(error => {
        swal('Error', error.message, 'error');
      })
        .then(() => {
        formRef.reset();
        swal({
          title: 'Organization pending',
          text: 'Please wait for approval by admin',
          icon: 'success',
          timer: 1500,
        });
      });
    }
  };

  let fRef = null;

  return (
    <div>
    <OrganizationSignupBackground/>
    <br/>
    <Container id={PAGE_IDS.ORGANIZATION_SIGNUP}>
      <br/>
      <Grid>
        <Grid.Column>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment stacked>
              <TextField name='organizationName' type='name' label='Organization Name' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_ORGANIZATION_NAME}/>
              <TextField name='email' type='email' label='E-mail Address' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_EMAIL}/>
              <TextField name='ein' label='EIN' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_EIN}/>
              <TextField name='primaryAddress' label='Primary Address' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_ADDRESS}/>
              <TextField name='city' label='City' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_CITY}/>
              <TextField name='state' label='State' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_STATE}/>
              <TextField name='zipcodePostalcode' label='Zip/Postal Code' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_ZIPCODE_POSTALCODE}/>
              <HiddenField name='industry' value={industry}/>
              <label>Industry</label>
              <Form.Group>
                <Grid columns{2}>
                  <Grid.Row style={{ paddingLeft: '8px' }}>
                    <Grid.Column>
                      <Form.Radio name='industry'
                                  label='Animal Welfare/Rescue'
                                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_ANIMAL_WELFARE_RESCUE}
                      />

                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <Form.Field>
                <label>Industry</label>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="Animal Welfare/Rescue"
                        name="industry"
                        value="Animal Welfare/Rescue"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Child/Family Support"
                        name="industry"
                        value="Child/Family Support"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="COVID-19 Recovery"
                        name="industry"
                        value="COVID-19 Recovery"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Crisis/Disaster Relief"
                        name="industry"
                        value="Crisis/Disaster Relief"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="Education"
                        name="industry"
                        value="Education"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Environment"
                        name="industry"
                        value="Environment"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="Elderly/Senior Care"
                        name="industry"
                        value="Elderly/Senior Care"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Food Banks"
                        name="industry"
                        value="Food Banks"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="Housing"
                        name="industry"
                        value="Housing"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Homelessness/Poverty"
                        name="industry"
                        value="Homelessness/Poverty"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Radio
                        label="Special Needs"
                        name="industry"
                        value="Special Needs"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Radio
                        label="Other"
                        name="industry"
                        value="Other"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Input
                label="Primary Contact First Name"
                name="primaryContactFirstName"
                type="primaryContactFirstName"
              />
              <Form.Input
                label="Primary Contact Last Name"
                name="primaryContactLastName"
                type="primaryContactLastName"
              />
              <Form.Input
                label="Primary Contact E-mail Address"
                name="primaryContactEmailAddress"
                type="email"
              />
              <Form.Input
                label="Primary Contact Phone Number"
                name="primaryContactPhoneNumber"
                type="phoneNumber"
              />
              <Form.Field>
                <label>Add a Secondary Contact</label>
                <Checkbox
                  label="Check here if you'd like to add a secondary contact"
                  name="secondaryContact"
                  value="Secondary Contact"
                />
              </Form.Field>
              <Form.Input
                label="Username"
                name="username"
              />
              <Form.Input
                label="Password"
                name="password"
              />
              <Form.Input
                label="Password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <Form.Field>
                <label>Show privacy policy</label>
                <Checkbox
                  label="Please confirm that you agree to our privacy policy"
                  name="privacyPolicy"
                />
              </Form.Field>
              <Grid centered>
                <Form.Button color='orange' size='massive'>Submit</Form.Button>
              </Grid>
              <br/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
      <br/>
    </Container>
  </div>
);
};

OrganizationSignup.propTypes = {
  location: PropTypes.object,
};

export default OrganizationSignup;
