import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingEventCalendarSection = () => (
  <Grid verticalAlign='middle' textAlign='center' rows='equal'>
    <Grid.Row>
      <p className="landing-header-3">
        Check Out Our Latest Opportunities
      </p>
    </Grid.Row>
    <Grid.Row>
      <Image src="/images/events-calendar-cards-mockup.png"/>
    </Grid.Row>
  </Grid>
);

export default LandingEventCalendarSection;
