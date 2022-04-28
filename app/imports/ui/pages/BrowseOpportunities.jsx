import React from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/* Renders a list of events. Use <EventCard> to render each event card. */
const BrowseOpportunities = ({ events }) => (
  <Container id={PAGE_IDS.BROWSE_OPPORTUNITIES}>
    <div className="browse-opportunity-header">
      <Header as="h1" textAlign="center" inverted>Browse Opportunities</Header>
    </div>
    <Card.Group centered style={{ paddingTop: '40px' }}>
      {events.map((event) => <EventCard key={event._id} event={event}/>)}
    </Card.Group>
  </Container>

);

// Require an array of BrowseOpportunities documents in the props.
BrowseOpportunities.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const ready = subscription1.ready();
  const events = Events.find({}, { sort: { name: 1 } }).fetch();
  return {
    events,
    ready,
  };
})(BrowseOpportunities);
