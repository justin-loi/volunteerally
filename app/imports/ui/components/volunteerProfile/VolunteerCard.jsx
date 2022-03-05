import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

console.log('you have reached here');

const VolunteerCard = (volunteer) => (
  <div>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Header as='h1'>{volunteer.firstName}</Header>
      </Grid.Column>
    </Grid.Row>
  </div>
);

VolunteerCard.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dob: PropTypes.string,
    address: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default VolunteerCard;
