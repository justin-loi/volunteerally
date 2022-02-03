import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const OrganizationSignupBackground = () => (
  <Grid verticalAlign="middle" className="organization-signup-background" centered>
    <Grid.Column textAlign='center'>
      <Header as='h1' inverted>
        Organization Sign-Up
      </Header>
      <Header as='h4'inverted>
        Sign up to be a registered organization.
      </Header>
    </Grid.Column>
  </Grid>
);
export default OrganizationSignupBackground;
