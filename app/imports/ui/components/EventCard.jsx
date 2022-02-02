import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventCard = ({ event }) => (
  <Card>
    <Image src='images/event_card_image_volunteer.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{event.eventName}</Card.Header>
      <Card.Meta>
        <span>Date: {event.date}</span>
        <br/>
        <span>Time: {event.time}</span>
        <br/>
        <span>Location: {event.location}</span>
        <br/>
      </Card.Meta>
      <Card.Description>
          Categories: {event.categories.map((category) => `${category}, `)}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        {event.organizationName}
      </a>
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
    categories: PropTypes.array,
    organizationName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EventCard);
