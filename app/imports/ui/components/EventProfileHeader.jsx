import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
<<<<<<< Updated upstream
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItem from '../components/StuffItem';
=======
import PropTypes from 'prop-types';
>>>>>>> Stashed changes
import { PAGE_IDS } from '../utilities/PageIDs';

/** The EventProfileHeader appears at the top of every page. Rendered by the App Layout component. */
const EventProfileHeader = () => {
  const gridStyle = { height: '500px', fontSize: '75px' };
  return (
    <div className="event-profile-top-background">
      <Grid container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' inverted>
<<<<<<< Updated upstream
              The American Red Cross of Hawaii: Disaster Response - Disaster Action Team
=======
                The American Red Cross of Hawaii: Disaster Response - Disaster Action Team
>>>>>>> Stashed changes
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted>
<<<<<<< Updated upstream
              Opportunity Date: November 9, 2021 8:00 am - 2:09 pm
=======
                Opportunity Date: November 9, 2021 8:00 am - 2:09 pm
>>>>>>> Stashed changes
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted>
<<<<<<< Updated upstream
              Contact Email: volunteerpacific@redcross.org
=======
                Contact Email: volunteerpacific@redcross.org
>>>>>>> Stashed changes
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

// Declare the types of all properties.
EventProfileHeader.propTypes =
<<<<<<< Updated upstream
{
  currentUser: PropTypes.string,
};
=======
    {
      currentUser: PropTypes.string,
    };
>>>>>>> Stashed changes

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default EventProfileHeader;
