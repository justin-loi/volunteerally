import React from 'react';
import { Container, Grid, Form, Segment, Checkbox, Radio } from 'semantic-ui-react';
import OrganizationSignupBackground from '../components/OrganizationSignupBackground';

const OrganizationSignup = () => (
  <div>
    <OrganizationSignupBackground />
    <br/>
    <Container>
      <br/>
      <Grid>
        <Grid.Column>
          <Form>
            <Segment stacked>
              <Form.Input
                label="E-mail Address"
                name="email"
                type="email"
              />
              <Form.Input
                label="EIN"
                name="EIN"
                type="EIN"
              />
              <Form.Input
                label="Primary Address"
                name="address"
                type="address"
              />
              <Form.Input
                label="City"
                name="city"
                type="city"
              />
              <Form.Input
                label="State"
                name="state"
                type="state"
              />
              <Form.Input
                label="Zip/Postal Code"
                name="zip_postalCode"
                type="zipcode"
              />
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
          </Form>
        </Grid.Column>
      </Grid>
      <br/>
    </Container>
  </div>
);

export default OrganizationSignup;
