import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

// `/details/${organization._id}`
// {organization.organizationName}

/** Renders a single organization card. */
const OrganizationCard = ({ organization }) => (
  <Card as={NavLink} exact to={'/'}>
    <Image src='images/event_card_default_image.png' wrapped ui={false}/>
    <Card.Content>
      <Card.Header>{organization.organizationName}</Card.Header>
      <Card.Meta>
        <Image src={organization.logoImage} size='tiny' circular/>
      </Card.Meta>
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
