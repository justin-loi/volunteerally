import React from 'react';
import { Container, Table, Header, Loader, Icon, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import ListVolunteersAdmin from '../components/ListVolunteersAdmin';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { Events } from '../../api/event/EventCollection';
import ListEventsAdmin from '../components/ListEventsAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminManageBoard = ({ ready, volunteers, events }) => ((ready) ? (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={
    // eslint-disable-next-line react/display-name
    [{ menuItem: 'Volunteers', render: () => <Tab.Pane>
      <Container id={PAGE_IDS.LIST_STUFF_ADMIN}>
        <Header as="h2" textAlign="center">Volunteers</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Volunteer <Icon name='user'/></Table.HeaderCell>
              <Table.HeaderCell>Email <Icon name='mail'/></Table.HeaderCell>
              <Table.HeaderCell>Phone Number<Icon name='phone'/></Table.HeaderCell>
              <Table.HeaderCell>Actions<Icon name='pencil alternate'/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {volunteers.map((volunteer) => <ListVolunteersAdmin key={volunteer._id} volunteer={volunteer} />)}
          </Table.Body>
        </Table>
      </Container>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Opportunities', render: () => <Tab.Pane>
      <Container id={PAGE_IDS.LIST_STUFF_ADMIN}>
        <Header as="h2" textAlign="center">Opportunities</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Opportunity <Icon name='handshake'/></Table.HeaderCell>
              <Table.HeaderCell>Time <Icon name='calendar alternate outline'/></Table.HeaderCell>
              <Table.HeaderCell>Organization <Icon name='building'/></Table.HeaderCell>
              <Table.HeaderCell>Email<Icon name='mail'/></Table.HeaderCell>
              <Table.HeaderCell>Actions<Icon name='pencil alternate'/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {events.map((event) => <ListEventsAdmin key={event._id} event={event} />)}
          </Table.Body>
        </Table>
      </Container>
    </Tab.Pane> },

    ]
  } />
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
AdminManageBoard.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  volunteers: PropTypes.array.isRequired,
  volunteerList: PropTypes.arrayOf(PropTypes.element),
  events: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Stuffs.subscribeStuffAdmin();
  const subscription2 = VolunteerProfiles.subscribe();
  const subscription3 = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  // Get the Stuff documents and sort by owner then name
  const stuffs = Stuffs.find({}, { sort: { owner: 1, name: 1 } }).fetch();
  const volunteers = VolunteerProfiles.find({}, {}).fetch();
  const events = Events.find({}, {}).fetch();
  // console.log(stuffs, ready);
  return {
    stuffs,
    ready,
    volunteers,
    events,
  };
})(AdminManageBoard);
