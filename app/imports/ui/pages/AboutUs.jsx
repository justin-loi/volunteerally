import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders the Page for adding a document. */
const AboutUs = () => (
  <Grid id={PAGE_IDS.ABOUT_US} container centered>
    <Grid.Column>
      <div className="row">
        <Header as="h1" textAlign="center">About VolunteerAlly</Header>
      </div>
      <div className="row">
        <Header as="h5" textAlign="center"> About VolunteerAlly </Header>
      </div>
    </Grid.Column>
  </Grid>
);

export default AboutUs;
