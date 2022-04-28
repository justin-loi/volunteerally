import React from 'react';
import { Grid, Image, Icon, Header, Container, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationCard from '../components/OrganizationCard';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const OrganizationLibrary = ({ ready, organizations }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_LIB} container centered>
    <Grid.Column>
      <div className = "org-lib-header">
        <Header as="h1" textAlign="center" inverted>Organization Library</Header>
        <Header as="h3" textAlign="center" inverted>Browse the organizations we work with</Header>
      </div>
    </Grid.Column>
    <Card.Group centered style={{ paddingTop: '30px' }}>
      {organizations.map((organization) => <OrganizationCard key={organization._id} organization={organization}/>)}
    </Card.Group>
    <Grid.Row style={{ paddingTop: '40px' }}>
      <Image size = 'huge' src= "/images/org-help-image.jpg"/>
      <Header as="h3" textAlign="center">
Join over 20 organizations already finding the help they need with Volunteer Ally.
      </Header>
      <Container textAlign="left">
        <p>There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
            Make sure your organization is volunteer-ready with Volunteer Ally.
            Our system allows you to easily post your volunteer opportunities and have them easily found
            by qualified volunteers – all for free! <br/> </p>
        <p>Here are some of the great features you’ll find with Volunteer Ally</p>
        <Icon color='blue' name ='check'/> Access to hundreds of volunteers with a wide range of skills and availability <br/>
        <Icon color='blue' name ='check'/> Direct opportunity RSVPs to your inbox <br/>
        <Icon color='blue' name ='check'/> Database of volunteers and opportunities <br/>
        <Icon color='blue' name ='check'/> Integration-ready <br/>
      </Container>
    </Grid.Row>
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
