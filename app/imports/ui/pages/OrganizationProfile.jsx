import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Button, Segment, Divider, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

/** Renders the Page for adding a document. */
const OrganizationProfile = ({ orgProfile, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} container centered>
    <Grid.Row >
      <Button>Settings</Button>
      <Button>Preferences</Button>
      <Button>Log Volunteer Hours</Button>
      <Button>Send an email</Button>
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
          <p>{orgProfile.phoneNumber}</p>
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

export default withTracker(() => {
  // Get access to organization documents.
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();

  const orgProfile = OrganizationProfiles.findOne({ userID: Meteor.userId() }, {});

  return {
    orgProfile,
    ready,
  };
})(OrganizationProfile);
