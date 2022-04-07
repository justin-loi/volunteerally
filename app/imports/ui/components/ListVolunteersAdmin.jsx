import React from 'react';
import { Button, Header, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/AdminManageBoard.jsx. */
const ListVolunteersAdmin = ({ volunteer }) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4' image>
        <Image src={volunteer.image} avatar />
        <Header.Content>
          {volunteer.firstName} {volunteer.lastName}
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>{volunteer.email}</Table.Cell>
    <Table.Cell>{volunteer.phoneNumber}</Table.Cell>
    <Table.Cell>
      <Button>Verify Hours</Button>
      <Button>Delete</Button>
    </Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
ListVolunteersAdmin.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListVolunteersAdmin;
