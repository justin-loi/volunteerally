import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Button, Segment, Divider, Header, Icon, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { ROLE } from '../../api/role/Role';
import EventCard from '../components/EventCard';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
import { Events } from '../../api/event/EventCollection';

/** Renders the Page for adding a document. */
const OrganizationProfile = ({ orgProfile, events, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} container centered>
    <Grid.Row>
      {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION])) ? (
        <Button as={NavLink} exact to={`/edit-organization-profile/${orgProfile._id}`}>Edit Profile</Button>
      ) : ''}
      <Button as={NavLink} exact to={`/volunteer-send-email/${orgProfile._id}`}>Send an email</Button>
    </Grid.Row>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Image src={orgProfile.logoImage} size='medium' centered />
      </Grid.Column>
      <Grid.Column>
        <Segment vertical>
          <Header as="h3">
            <Icon name="home"/>Organization Name
          </Header>
          <p>{orgProfile.organizationName}</p>
          <Header as="h3">
            <Icon name="phone"/>Phone Number
          </Header>
          <p>{orgProfile.primaryContactPhone}</p>
          <Header as="h3">
            <Icon name="tag"/>Mission Statement
          </Header>
          <p>{orgProfile.missionStatement}</p>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Divider/>
    <Grid.Row>
      <Header>{`${orgProfile.organizationName}'s events:`}</Header>
    </Grid.Row>
    <Card.Group centered>
      {
        events.map((event) => <EventCard key={event._id} event={event}/>)
      }
    </Card.Group>
  </Grid>
) : <Loader active>Getting data</Loader>);

OrganizationProfile.propTypes = {
  orgProfile: PropTypes.object,
  events: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to organization documents.
  const { _id } = match.params;
  const orgProfileId = _id;
  const subscription = OrganizationProfiles.subscribe();
  const subscription2 = OrganizationEvent.subscribe();
  const subscription3 = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  const orgProfile = OrganizationProfiles.findDoc(orgProfileId);
  console.log(orgProfileId);
  const eventOrganizations = OrganizationEvent.find({ organizationID: orgProfileId }, {}).fetch();
  const eventIDList = _.uniq(eventOrganizations.map(eventOrganization => eventOrganization.eventID));
  const events = eventIDList.map((eventID) => Events.findOne({ _id: eventID }, {}));
  return {
    orgProfile,
    events,
    ready,
  };
})(OrganizationProfile);
