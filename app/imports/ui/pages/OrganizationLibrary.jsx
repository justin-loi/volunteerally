import React from 'react';
import { Grid, Image, Button, Icon, Header, Container, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import OrganizationCard from '../components/OrganizationCard';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const OrganizationLibrary = ({ ready, organizations, currentUser }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_LIB} container centered>
    <Grid verticalAlign='middle' textAlign='center' rows='equal' container>
      <Grid.Row>
        <div className = "org-lib-header">
          <Header as="h1" textAlign="center">Organization Library</Header>
          <Header as="h2" textAlign="center">Browse the organizations we work with</Header>
        </div>
      </Grid.Row>

      <Card.Group centered>
        {organizations.map((organization) => <OrganizationCard key={organization._id} organization={organization}/>)}
      </Card.Group>
      <Grid.Row>
        <Image size = 'huge' src= "/images/org-help-image.jpg"/>
        <p>
Join over 20 organizations already finding the help they need with Volunteer Ally.
        </p>
      </Grid.Row>

      <Grid.Row textAlign="left" >
        <p>There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
Make sure your organization is volunteer-ready with Volunteer Ally.
Our system allows you to easily post your volunteer opportunities and have them easily found
by qualified volunteers – all for free! <br/> </p>
        <p>Here are some of the great features you’ll find with Volunteer Ally</p>
        <br/>
        <Container textAlign="center">
          <Icon color='blue' name ='check'/> Access to hundreds of volunteers with a wide range of skills and availability <br/>
          <Icon color='blue' name ='check'/> Direct opportunity RSVPs to your inbox <br/>
          <Icon color='blue' name ='check'/> Database of volunteers and opportunities <br/>
          <Icon color='blue' name ='check'/> Integration-ready <br/>
        </Container>

      </Grid.Row>

      <Grid.Row>
        {currentUser ?
          '' : (<Button size='massive' color='green'>Sign Up Today</Button>)}
      </Grid.Row>
    </Grid>
  </Grid>
) : <Loader active>Getting data</Loader>);

// Declare the types of all properties.
OrganizationLibrary.propTypes = {
  currentUser: PropTypes.string,
  organizations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const OrganizationLibraryContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const organizations = OrganizationProfiles.find({}, { sort: { name: 1 } }).fetch();
  return {
    currentUser,
    ready,
    organizations,
  };
})(OrganizationLibrary);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(OrganizationLibraryContainer);
