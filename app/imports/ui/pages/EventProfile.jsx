import React from 'react';
import { Container, Table, Button, Header, Loader, Grid, Icon, Divider, Segment, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItem from '../components/StuffItem';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const gridStyle = { height: '500px', fontSize: '75px' };
const EventProfile = ({ ready, stuffs }) => ((ready) ? (
  /* <div className="top-landing-background">
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
  </div> */
  <Container>

    <Header> General Information</Header>
    <Grid stackable columns={2}>
      <Grid.Row centered>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </Grid.Row>

      <Grid.Column>
        <Segment>
          <Header as="h3">
            <Icon name="bus"/> Location
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            <Icon name="bus"/> Description
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            <Icon name="bus"/> Other Details
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            <Icon name="bus"/> Upcoming Dates
          </Header>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as="h3">
              Organization
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            Contact Information
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            Categories
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            Gallery
          </Header>
        </Segment>
        <Segment>
          <Header as="h3">
            RSVP
          </Header>
        </Segment>
      </Grid.Column>
    </Grid>
  </Container>

/*
  <Container id={PAGE_IDS.LIST_STUFF}>
    <Header as="h2" textAlign="center">List Stuff</Header>
    <Container>
      <Grid>
        <Grid.Column width={6}>
          <Segment>
            <Header as="h3">
              <Icon name="bus"/> HEA
            </Header>
            <Header as="h4">
              Real-Time Bus Arrival
            </Header>
            <p>Enter Street name or location</p>
            <Input action='search' placeholder='Search...' />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header as="h3">
              Service Disruption
            </Header>
            <Header as="h4">
              January 23, 2021 05:00am - Kuntz Gate Closed on Weekends
            </Header>
            <Divider/>
            <p>Route(s) 303</p>
            <p>No service Eastbound and Westbound on Elliott St. Please board buses on Nimitz prior to Elliott, and
              on Kuntz Ave after the self serve car wash.</p>
            <p><a className="white" href="#">Click here to see more Service Disruptions...</a></p>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  </Container> */
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
EventProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Stuffs.subscribeStuff();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const stuffs = Stuffs.find({}, { sort: { name: 1 } }).fetch();
  return {
    stuffs,
    ready,
  };
})(EventProfile);
