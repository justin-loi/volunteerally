import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Grid id={PAGE_IDS.LANDING} verticalAlign='middle' textAlign='center' rows='equal' className="landing-background-top" container>
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
    <Grid.Row className="landing-white-background">
      <p className="landing-header-3">
        Dozens of Opportunities for Organizations and Volunteers
      </p>
    </Grid.Row>
    <Grid.Row className="landing-white-background" columns={5} colums='equal'>
      <Grid.Column>
        <p className="landing-descriptions">
          Take a look at the various organizations Volunteer Ally works with, each with unique volunteer opportunities offering various dates, times, and locations.
        </p>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/aloha-sanctuary-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/food-bank-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/habitat-humanity-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/meals-on-wheels-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className="landing-white-background" columns={5} colums='equal'>
      <Grid.Column>
        <p className="landing-descriptions">
          Volunteer Ally is a non-profit organization match system designed to pair organizations with volunteers. We partner with various organizations in need of passionate volunteers.
        </p>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/helping-hands-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/malama-maunalua-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/maunalua-fishpond-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/read-to-me-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className="landing-white-background" columns={5} colums='equal'>
      <Grid.Column>
        <p className="landing-descriptions">
          Becoming a user is required to ensure committed reliable volunteers for our organizations.
        </p>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/big-bros-big-sis-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/humane-society-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/pohai-nani-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/protect-preserve-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className="landing-white-background" columns={5} colums='equal'>
      <Grid.Column>
        <Button size='huge' color='blue'>Join Now!</Button>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/red-cross-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/surf-rider-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/the-pantry-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/salvation-army-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className="landing-white-background">
      <Button size='massive' color='blue'>View All Opportunities</Button>
    </Grid.Row>

  </Grid>
);

export default Landing;
