import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** The EventProfileHeader appears at the top of every page. Rendered by the App Layout component. */
const EventProfileHeader = () => {
  const gridStyle = { height: '500px', fontSize: '75px' };
  return (
    <div className="event-profile-top-background">
      <Grid container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' inverted>
                The American Red Cross of Hawaii: Disaster Response - Disaster Action Team
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted>
                Opportunity Date: November 9, 2021 8:00 am - 2:09 pm
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted>
                Contact Email: volunteerpacific@redcross.org
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

// Declare the types of all properties.
EventProfileHeader.propTypes =
    {
      currentUser: PropTypes.string,
    };

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default EventProfileHeader;
