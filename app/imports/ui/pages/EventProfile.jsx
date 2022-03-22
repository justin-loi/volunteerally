import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Grid, Icon, Segment, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

// Renders a Event Info page that connects with the current Event collection.
const gridStyle = { height: '500px', fontSize: '75px' };

const EventProfile = ({ event, orgProfile, currentUser, ready }) => ((ready) ? (
  <div>
    <div className="event-profile-top-background">
      <Grid stackable container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' inverted block>
              {event.eventName}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted block>
              Opportunity Date: {event.date} {event.time}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted block>
              {orgProfile.email}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    <Container>
      <Header as='h1' textAlign='center'>General Information</Header>

      <Grid stackable columns={2}>
        <Grid.Row centered>
          <Button>Get directions</Button>
          <Button>Bookmark</Button>
          <Button>Share</Button>
          <Button>Send an email</Button>
          <Button>Direct Message</Button>
          <Button>Report</Button>
        </Grid.Row>

        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="location arrow"/> Location
            </Header>
            <Image src="images/red-cross-map.jpeg"/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="write"/> Description
            </Header>
            <p>
              This event requires orientation and training, please revert to website for additional information.*
              Disaster Action Team volunteers help local families cope with emergencies. Home fires and other
              disasters can occur at any time, any place. As a Disaster Action Team volunteer, you&apos;ll provide
              emotional support, financial assistance, and information to help families begin the process of
              recovery. After your initial training, your shifts will include responding to emergencies within 2
              hours, night or day, rain or shine, either on the scene or coordinating remotely to provide immediate
              compassion and care. Location will vary base on the situation.
            </p>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="grid layout"/> Other Details
            </Header>
            <Icon name='user circle'/> Family-Friendly, Adults <br/>
            <Icon name='user plus'/> Mixed
          </Segment>
          <Segment>
            <Header as="">
              <Icon name="calendar"/> Upcoming Dates
            </Header>
            {event.date} {event.time}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="building"/> Organization
            </Header>
            {event.orgName}
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="address card"/> Contact Details
            </Header>
            {orgProfile.firstName} {orgProfile.lastName}<br/>
            {orgProfile.email} <br/>
            808 - 734 - 2101 <br/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Gallery
            </Header>
            <Image src="images/red-cross-gallery.jpeg"/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="sort"/> Categories
            </Header>
            {event.categories}
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="group"/> RSVP
            </Header>
            {currentUser ?
              'Form is currently under construction' : ('Please log in or register to RSVP.')}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  </div>
) : <Loader active>Getting data</Loader>);

// Require an Event object in the props.
EventProfile.propTypes = {
  event: PropTypes.object,
  orgProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // Get the eventID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const eventId = _id;
  // Get access to Events documents.
  const subscription1 = Events.subscribe();
  const subscription2 = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready();
  const event = Events.find({ _id: eventId }).fetch()[0];
  let orgProfile;
  if (event !== undefined) {
    orgProfile = OrganizationProfiles.findByEmail(event.owner);
    // console.log(orgProfile);
    // console.log(event);
  }

  return {
    event,
    currentUser,
    orgProfile,
    ready,
  };

})(EventProfile);
