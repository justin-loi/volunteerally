import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { PAGE_IDS } from '../../utilities/PageIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingTopSection = () => (
  <Grid id={PAGE_IDS.LANDING_TOP_SECTION} verticalAlign='middle' textAlign='center' rows='equal' className="landing-background-top">
    <Grid.Row>
      <Image className="landing-volunteer-ally-logo" size='medium' circular src="/images/volunteer-ally-temp-logo.png" centered/>
    </Grid.Row>
    <Grid.Row>
      <p className="landing-header-1">
            A Better Way to Volunteer!
      </p>
    </Grid.Row>
    <Grid.Row>
      <p className="landing-header-2">
            We connect passionate volunteers with charitable organizations in order to build community.<br/> Let us help you easily find service opportunities for organizations in your area of interest.
      </p>
    </Grid.Row>
  </Grid>
);

export default LandingTopSection;
