import React from 'react';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import EventCard from '../components/EventCard';

/** Renders a list of events. Use <EventCard> to render each event card. */
const BrowseOpportunities = ({ ready, events }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_STUFF}>
    <Header as="h2" textAlign="center">Browse Opportunities</Header>
    <Card.Group>
      {events.map((event, index) => <EventCard key={index} event={event}/>)}
    </Card.Group>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of BrowseOpportunities documents in the props.
BrowseOpportunities.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to events documents.
  // const subscription = events.subscribeStuff();
  // Determine if the subscription is ready
  // const ready = subscription.ready();
  const ready = true;
  // Get the Stuff documents and sort them by name.
  // const events = Events.find({}, { sort: { name: 1 } }).fetch();
  // random data
  const events = [
    { eventName: 'back to school',
      date: 'February 1, 2022', time: '8:00am - 8:00pm', location: 'UHM',
      categories: ['Education', 'Environment'],
      organizationName: 'UHM' },
    { eventName: 'M1 presentation',
      date: 'February 3, 2022', time: '12:00pm - 1:15pm', location: 'POST 319',
      categories: ['Education', 'Oral Communication'],
      organizationName: 'ICS 414' },
    { eventName: 'M1 party',
      date: 'February 3, 2022', time: '1:15pm - 1:20pm', location: 'POST 319',
      categories: ['Education', 'Relax', 'Prepare M2'],
      organizationName: 'ICS 414 Team' },
  ];
  return {
    events,
    ready,
  };
})(BrowseOpportunities);
