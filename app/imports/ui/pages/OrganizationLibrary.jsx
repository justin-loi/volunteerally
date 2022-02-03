import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const OrganizationLibrary = () => (
  <Grid verticalAlign='middle' textAlign='center' rows='equal' container>
    <Grid.Row>
      <p className="Landing-header-1">
        Organization Library
      </p>
      <p className="landing-header-3">
        Browse the organizations we work with
      </p>
    </Grid.Row>
    <Grid.Row columns='equal'>
      <Grid.Column>
        <Image size='small' circular src="/images/aloha-sanctuary-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='tiny' circular src="/images/food-bank-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/habitat-humanity-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/meals-on-wheels-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className="landing-white-background" columns='equal'>
      <Grid.Column>
        <Image size='small' circular src="/images/helping-hands-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/malama-maunalua-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/maunalua-fishpond-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/read-to-me-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns='equal'>
      <Grid.Column>
        <Image size='small' circular src="/images/big-bros-big-sis-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/humane-society-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/pohai-nani-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/protect-preserve-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={5} colums='equal'>
      <Grid.Column>
        <Button size='huge' color='blue' as={NavLink}
          exact to={'/volunteer_signup'}>Join Now!</Button>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/red-cross-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/surf-rider-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/the-pantry-logo.png"/>
      </Grid.Column>
      <Grid.Column>
        <Image size='small' circular src="/images/salvation-army-logo.png"/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Image size = 'large' src='/image/org-help-image.jpg'/>
      <p>
        Join over 20 organizations already finding the help they need with Volunteer Ally.
      </p>
    </Grid.Row>

    <Grid.Row>
      <p>There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
        Make sure your organization is volunteer-ready with Volunteer Ally.
        Our system allows you to easily post your volunteer opportunities and have them easily found
        by qualified volunteers – all for free! </p>
      <p>
        Here are some of the great features you’ll find with Volunteer Ally:
      </p>
      <p> <Icon color='blue' name ='check'/> </p>
      <p> <Icon color='blue' name ='check'/> </p>
      <p> <Icon color='blue' name ='check'/> </p>
      <p> <Icon color='blue' name ='check'/> </p>
    </Grid.Row>

    <Grid.Row>
      <Button size='massive' color='blue'>Sign Up Today</Button>
    </Grid.Row>
  </Grid>
);

export default OrganizationLibrary;
