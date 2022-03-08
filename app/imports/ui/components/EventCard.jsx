import React from 'react';
import { Card, Image, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

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
    <Card.Meta>
      <Button content='Like' icon={{ color: 'red', name: 'like' }} />
      {/* 💡 you can also add handlers and any DOM props to shorthands */}
      <Input
        action={{
          icon: 'search',
          onClick: () => console.log('An action was clicked!'),
        }}
        actionPosition='left'
        placeholder='Search...'
      />
    </Card.Meta>
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
