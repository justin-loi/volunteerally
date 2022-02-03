import React from 'react';
import { Grid, Image, Button, Icon, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const OrganizationLibrary = () => (
  <Grid id={PAGE_IDS.ORGANIZATION_LIB} container centered>
    <Grid verticalAlign='middle' textAlign='center' rows='equal' container>
      <Grid.Row>
        <div className = "org-lib-header">
          <Header as="h1" textAlign="center">Organization Library</Header>
          <Header as="h2" textAlign="center">Browse the organizations we work with</Header>
        </div>
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

      <Grid.Row columns={4} colums='equal'>
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
        <Image size = 'huge' src= "/images/org-help-image.jpg"/>
        <p>
        Join over 20 organizations already finding the help they need with Volunteer Ally.
        </p>
      </Grid.Row>

      <Grid.Row textAlign="left align" >
        <p>There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
        Make sure your organization is volunteer-ready with Volunteer Ally.
        Our system allows you to easily post your volunteer opportunities and have them easily found
        by qualified volunteers – all for free! <br/> </p>
        <p>Here are some of the great features you’ll find with Volunteer Ally <br/>
          <div>
            <Icon color='blue' name ='check'/> Access to hundreds of volunteers with a wide range of skills and availability <br/>
            <Icon color='blue' name ='check'/> Direct opportunity RSVPs to your inbox <br/>
            <Icon color='blue' name ='check'/> Database of volunteers and opportunities <br/>
            <Icon color='blue' name ='check'/> Integration-ready <br/>
          </div>
        </p>
      </Grid.Row>

      <Grid.Row>
        {/**what is the purpose of this button?*/}
        <Button size='massive' color='green'>Sign Up Today</Button>
      </Grid.Row>
    </Grid>
  </Grid>
);

export default OrganizationLibrary;
