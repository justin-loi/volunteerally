import React from 'react';
<<<<<<< Updated upstream
import { Container, Table, Button, Header, Loader, Grid, Icon, Divider, Segment, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItem from '../components/StuffItem';
=======
import { Container, Button, Header, Loader, Grid, Icon, Image, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
>>>>>>> Stashed changes
import { PAGE_IDS } from '../utilities/PageIDs';
import EventProfileHeader from '../components/EventProfileHeader';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
<<<<<<< Updated upstream
const EventProfile = ({ ready, stuffs }) => ((ready) ? (
  <div>
    <EventProfileHeader/>
    <Container>
      <Header textAlign='center'> General Information</Header>
=======
const EventProfile = ({ ready }) => ((ready) ? (
  <div>
    <EventProfileHeader/>
    <Container>
      <Header as='h1' textAlign='center'> General Information</Header>
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
            <Image src="images/red-cross-map.jpeg"/>
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="write"/> Description
            </Header>
<<<<<<< Updated upstream
=======
            <p>
              This event requires orientation and training, please revert to website for additional information.* Disaster Action Team volunteers help local families cope with emergencies. Home fires and other disasters can occur at any time, any place. As a Disaster Action Team volunteer, you'll provide emotional support, financial assistance, and information to help families begin the process of recovery. After your initial training, your shifts will include responding to emergencies within 2 hours, night or day, rain or shine, either on the scene or coordinating remotely to provide immediate compassion and care. Location will vary base on the situation.
            </p>
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="grid layout"/> Other Details
            </Header>
<<<<<<< Updated upstream
=======
            <Icon name='user circle'/> Family-Friendly, Adults <br/>
            <Icon name='user plus'/> Mixed
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="">
              <Icon name="calendar"/> Upcoming Dates
            </Header>
<<<<<<< Updated upstream
=======
            November 9, 2021 8:00 am - 2:09 pm
>>>>>>> Stashed changes
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="building"/> Organization
            </Header>
<<<<<<< Updated upstream
=======
            Curren Gaspar
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="address card"/> Contact Details
            </Header>
<<<<<<< Updated upstream
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Other Details
            </Header>
=======
            Mary Finley <br/>
            volunteerpacific@redcross.org <br/>
            808 - 734 - 2101 <br/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Gallery
            </Header>
            <Image src="images/red-cross-gallery.jpeg"/>
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="sort"/> Categories
            </Header>
<<<<<<< Updated upstream
=======
            Child/Family Support <br/>
            Crisis/Disaster Relief <br/>
            Environment <br/>
>>>>>>> Stashed changes
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="group"/> RSVP
            </Header>
<<<<<<< Updated upstream
=======
            Please log in or register to RSVP.
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const stuffs = Stuffs.find({}, { sort: { name: 1 } }).fetch();
  return {
    stuffs,
=======
  return {
>>>>>>> Stashed changes
    ready,
  };
})(EventProfile);
