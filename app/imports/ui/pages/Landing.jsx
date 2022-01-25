import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Grid id={PAGE_IDS.LANDING} verticalAlign='middle' textAlign='center' rows='equal' className="landing-background-top" container>
    <Grid.Row>
      <Image className="landing-volunteer-ally-logo" size='medium' circular src="/images/volunteer-ally-temp-logo.png" centered/>
    </Grid.Row>
    <Grid.Row>
      <p size="huge" className="landing-header-1">
        A Better Way to Volunteer!
      </p>
    </Grid.Row>
    <Grid.Row>
      <p className="landing-header-2">
        We connect passionate volunteers with charitable organizations in order to build community.<br/> Let us help you easily find service opportunities for organizations in your area of interest.
      </p>
    </Grid.Row>
    <Grid.Row className="landing-white-background">

    </Grid.Row>
  </Grid>
);

export default Landing;
