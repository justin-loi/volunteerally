import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingBottomSection = () => (
  <Grid id={PAGE_IDS.LANDING} verticalAlign='middle' textAlign='center' rows='equal' className="landing-background-bottom">
    <Grid.Row>
      <p className="landing-bottom-header-1">
        Ready To Get Started?
      </p>
    </Grid.Row>
    <Grid.Row>
      <p className="landing-bottom-header-2">
        Sign up now as a volunteer or organization
      </p>
    </Grid.Row>
    <Grid.Row>
      <Button size='massive' color='blue' as={NavLink}
        exact to={'/volunteer_signup'}>Join Now!</Button>
    </Grid.Row>
  </Grid>
);

export default LandingBottomSection;
