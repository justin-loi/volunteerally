import React from 'react';
import { Button, Header, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/AdminManageBoard.jsx. */
const ListEventsAdmin = ({ event }) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4'>
        <Header.Content>
          {event.eventName}
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>{event.time}</Table.Cell>
    <Table.Cell>{event.orgName}</Table.Cell>
    <Table.Cell>{event.owner}</Table.Cell>
    <Table.Cell>
      <Button>View</Button>
      <Button>Delete</Button>
    </Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
ListEventsAdmin.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    orgName: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default ListEventsAdmin;
