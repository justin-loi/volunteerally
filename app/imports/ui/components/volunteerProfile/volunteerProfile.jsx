import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const volunteerProfile = ({ volunteer }) => (
  <div>
    <Header as="h1" Hello test></Header>
    <Header as="h1">{volunteer.firstName}</Header>
  </div>
);

volunteerProfile.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default volunteerProfile;
