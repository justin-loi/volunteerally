import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders the Page for adding a document. */
const AboutUs = () => (
  <Grid id={PAGE_IDS.ABOUT_US} container centered>
    <Grid.Column>
      <Header as="h2" textAlign="center">Add Stuff</Header>
    </Grid.Column>
  </Grid>
);

export default AboutUs;
