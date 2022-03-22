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
      <Card.Header>
        <span>{organization.organizationName}</span>
        <Image src={organization.logoImage} size='mini' circular/>
      </Card.Header>
      <Card.Description>
        <p>
          {organization.missionStatement}
        </p>
        <p>
          Representative:
          {organization.firstName} {organization.lastName}
        </p>
      </Card.Description>
      <Card.Content>
        <span>Give Us A Call!!</span>
        {organization.phoneNumber}
      </Card.Content>
      <Card.Content extra>

      </Card.Content>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string,
    logoImage: PropTypes.string,
    missionStatement: PropTypes.string,
    eventBackgroundImage: PropTypes.string,
    organizationName: PropTypes.string,
    phoneNumber: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrganizationCard);
