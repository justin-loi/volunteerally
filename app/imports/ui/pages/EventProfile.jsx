import React from 'react';
import { Container, Button, Header, Loader, Grid, Icon, Segment, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import EventProfileHeader from '../components/EventProfileHeader';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const EventProfile = ({ ready }) => ((ready) ? (
  <div>
    <EventProfileHeader/>
    <Container>
      <Header as='h1' textAlign='center'> General Information</Header>

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
            November 9, 2021 8:00 am - 2:09 pm
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="building"/> Organization
            </Header>
            Curren Gaspar
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="address card"/> Contact Details
            </Header>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Other Details
            </Header>
            Mary Finley <br/>
            volunteerpacific@redcross.org <br/>
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
            Child/Family Support <br/>
            Crisis/Disaster Relief <br/>
            Environment <br/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="group"/> RSVP
            </Header>
            Please log in or register to RSVP.
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  </div>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
EventProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Stuffs.subscribeStuff();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const stuffs = Stuffs.find({}, { sort: { name: 1 } }).fetch();
  return {
    stuffs,
    ready,
  };
})(EventProfile);
