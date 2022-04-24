import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Button, Segment, Divider, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { ROLE } from '../../api/role/Role';

/** Renders the Page for adding a document. */
const OrganizationProfile = ({ orgProfile, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} container centered>
    <Grid.Row >
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
    </Grid.Row>
  </Grid>
) : <Loader active>Getting data</Loader>);

OrganizationProfile.propTypes = {
  orgProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to organization documents.
  const { _id } = match.params;
  const orgProfileId = _id;
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();

  const orgProfile = (orgProfileId === 'user') ? OrganizationProfiles.findOne({ userID: Meteor.userId() }, {}) :
    (OrganizationProfiles.findOne({ _id: orgProfileId }, {}));

  return {
    orgProfile,
    ready,
  };
})(OrganizationProfile);
