import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

console.log('you have reached here');

const volunteerCard = ({ volunteer }) => (
  <div>
    <Header as="h1">Hello {volunteer.firstName}</Header>
  </div>
);

volunteerCard.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default volunteerCard;
