import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/* Renders a single event card. */
const EventCard = ({ event }) => (
  <Card as={NavLink} exact to={`/details/${event._id}`}>
    <Image src='images/event_card_default_image.png' wrapped ui={false}/>
    <Card.Content>
      <Card.Header> {event.eventName}</Card.Header>
      <Card.Meta>
        <span>Date: {event.date}</span>
        <br/>
        <span>Time: {event.time}</span>
        <br/>
        <span>Location: {event.location}</span>
        <br/>
      </Card.Meta>
      <Card.Description>
        <p>Placeholder for special skill.</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <p>
        {event.categories}
      </p>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    categories: PropTypes.string,
    orgName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(EventCard);
