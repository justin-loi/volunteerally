import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Image } from 'semantic-ui-react';

console.log('you have reached here');

const volunteerCard = () => (
  <div>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Image src='images/profile.png' size='medium' circular />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid.Row>
  </div>
);

volunteerCard.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dob: PropTypes.string,
    address: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default volunteerCard;
