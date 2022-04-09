import React from 'react';
import { Container, Table, Header, Loader, Checkbox, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { Events } from '../../api/event/EventCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VolunteerListForEvent = ({ ready, event, volunteers }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_VOLUNTEER_AT_EVENT}>
    <Header as="h2" textAlign="center">Volunteer List For { event.eventName }</Header>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Hours participated</Table.HeaderCell>
          <Table.HeaderCell>Attended?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {volunteers.map((volunteer, index) => (
          <Table.Row key={`list-volunteer-table-row-${index}`}>
            <Table.Cell>{volunteer.lastName} {volunteer.firstName}</Table.Cell>
            <Table.Cell>{event.time}</Table.Cell>
            <Table.Cell width={3}><Checkbox/></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <div style={{ paddingBottom: '26px' }}>
      <Button floated='right' size='small'>Confirm</Button>
      <Button floated='right' size='small'>Check all</Button>
    </div>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
VolunteerListForEvent.propTypes = {
  event: PropTypes.object.isRequired,
  volunteers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const { _id } = match.params;
  const eventID = _id;
  // Get access to all documents.
  const subscription1 = Events.subscribe();
  const subscription2 = VolunteerEvent.subscribe();
  const subscription3 = VolunteerProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  // Get the Stuff documents and sort them by name.
  const event = (subscription1.ready()) ? Events.findOne({ _id: eventID }, {}) : {};
  const volEventArray = VolunteerEvent.find({ eventID: eventID }, {}).fetch();
  const volunteerIDArray = volEventArray.map(volEvent => volEvent.volunteerID);
  const volunteers = volunteerIDArray.map(volunteerID => VolunteerProfiles.findOne({ userID: volunteerID }, { sort: { lastName: 1 } }));
  return {
    event,
    volunteers,
    ready,
  };
})(VolunteerListForEvent);
