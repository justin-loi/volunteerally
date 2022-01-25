import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingEventCalendarSection = () => (
  <Grid divided='horizontally' verticalAlign='middle' textAlign='center' rows='equal' container>
    <Grid.Row columns='equal'>
      <Image src="/images/events-calendar-cards-mockup.png"/>
    </Grid.Row>
  </Grid>
);

export default LandingEventCalendarSection;
