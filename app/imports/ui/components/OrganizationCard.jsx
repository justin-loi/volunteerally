import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single event card. */
const OrganizationCard = ({ organization }) => (
  <Card as={NavLink} exact to={`/details/${organization._id}`}>
    <Image src='images/event_card_image_volunteer.jpg' wrapped ui={false}/>
    <Card.Content>
      <Card.Header> {organization.organizationName}</Card.Header>
      <Card.Meta>
        {organization.logoImage}
      </Card.Meta>
      <Card.Description>
        <p>Placeholder for special skill</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string,
    logoImage: PropTypes.string,
    eventBackgroundImage: PropTypes.string,
    organizationName: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrganizationCard);
