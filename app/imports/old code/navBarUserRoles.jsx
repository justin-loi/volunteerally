import { Dropdown, Menu } from 'semantic-ui-react';
import { COMPONENT_IDS } from '../ui/utilities/ComponentIDs';
import { NavLink } from 'react-router-dom';
import { ROLE } from '../api/role/Role';

/** navBar userRole code */

{currentUser ? (
  [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
) : ''}
{Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
  [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
    <Dropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} item text="Manage" key="manage-dropdown">
      <Dropdown.Menu>
        <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} exact to="/manage-database" content="Database" />
      </Dropdown.Menu>
    </Dropdown>]
) : ''}
<Menu.Item position="right">
