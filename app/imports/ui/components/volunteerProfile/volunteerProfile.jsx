import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const volunteerProfile = ({ volunteers }) => (
  <Header as="h1">Hello {volunteers.firstName}</Header>
);

volunteerProfile.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default volunteerProfile;
