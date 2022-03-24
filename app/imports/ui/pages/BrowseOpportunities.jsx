import React from 'react';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';

/* Renders a list of events. Use <EventCard> to render each event card. */
const BrowseOpportunities = ({ ready, events }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_EVENTS}>
    <Header as="h2" textAlign="center">Browse Opportunities</Header>
    <Card.Group centered>
      {events.map((event) => <EventCard key={event._id} event={event}/>)}
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
  const subscription = Events.subscribe();
  const ready = subscription.ready();
  const events = Events.find({}, { sort: { name: 1 } }).fetch();
  return {
    events,
    ready,
  };
})(BrowseOpportunities);
