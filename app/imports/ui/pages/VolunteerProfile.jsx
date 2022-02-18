import React from 'react';
import { Grid, Header, Image, Loader, Label, Segment, Divider, Icon, Card, Button, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { Events } from '../../api/event/EventCollection';

/** Renders the Page for adding a document. */
const VolunteerProfile = ({ event, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.VOLUNTEER_PROFILE} container centered>
    <Grid.Row>
      <Image src='/images/volunteer_profile_banner.png' size='big' />
    </Grid.Row>
    <Grid.Row >
      <Button>Settings</Button>
      <Button>Preferences</Button>
      <Button>Log Volunteer Hours</Button>
      <Button>Send an email</Button>
    </Grid.Row>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Label color='teal' size='massive' ribbon>
          Tom Jerry
        </Label>
        <Image src='images/profile.png' size='medium' circular centered />
        <Divider/>
        <Segment>
          <Header as="h3">
            <Icon name="tag"/> Interests
          </Header>
          <Label>
            <Icon name='leaf' size='big' /> Environment
          </Label>
          <Label>
            <Icon name='paw' size='big'/> Animal Welfare/Rescue
          </Label>
          <Label>
            <Icon name='graduation cap' size='big'/> Education
          </Label>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>22</Statistic.Value>
              <Icon name="clock" size='big'/>
              <Statistic.Label>Total Hours Volunteered</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>2</Statistic.Value>
              <Icon name="building" size='big'/>
              <Statistic.Label>Organizations Helped</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>5</Statistic.Value>
              <Icon name="globe" size='big'/>
              <Statistic.Label>Events Participated</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Segment>
          <Header as="h3">
            <Icon name="calendar outline"/> Upcoming Events
          </Header>
          <Card as={NavLink} exact to={`/details/${event._id}`}>
            <Image src='images/event_card_image_volunteer.jpg' size='medium'/>
            <Card.Content>
              <Card.Header> Mowing Peoples Lawns</Card.Header>
              <Card.Meta>
                <span>Date: 8:00am - 8:00pm</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Divider/>
    <Grid.Row>
    </Grid.Row>
  </Grid>
) : <Loader active>Getting data</Loader>);

VolunteerProfile.propTypes = {
  volunteers: PropTypes.array.isRequired,
  event: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // volunteers.map((volunteer) => <VolunteerCard key={volunteer._id} volunteer={volunteer}
  // Get access to volunteer documents.
  const subscription = VolunteerProfiles.subscribe();
  const subscription2 = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the volunteer documents and sort them by name.
  const event = Events.find({}, { sort: { name: 1 } }).fetch()[0];
  const volunteers = VolunteerProfiles.find({}, { sort: { name: 1 } }).fetch();
  return {
    volunteers,
    event,
    ready,
  };
})(VolunteerProfile);
