import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import VolunteerAdmin from '../components/VolunteerAdmin';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListVolunteersAdmin = ({ volunteers, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_STUFF_ADMIN}>
    <Header as="h2" textAlign="center">Volunteers</Header>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone Number</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {volunteers.map((volunteer) => <VolunteerAdmin key={volunteer._id} volunteer={volunteer} />)}
      </Table.Body>
    </Table>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
ListVolunteersAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  volunteers: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Stuffs.subscribeStuffAdmin();
  const subscription2 = VolunteerProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents and sort by owner then name
  const stuffs = Stuffs.find({}, { sort: { owner: 1, name: 1 } }).fetch();
  const volunteers = VolunteerProfiles.find({}, {}).fetch();
  // console.log(stuffs, ready);
  return {
    stuffs,
    ready,
    volunteers,
  };
})(ListVolunteersAdmin);
