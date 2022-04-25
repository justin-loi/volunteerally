import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon, Label } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
// eslint-disable-next-line import/named
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';
import { Messages } from '../../api/message/MessageCollection';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser, colorUsage }) => {
  const menuStyle = { marginBottom: '10px', backgroundColor: colorUsage, flexShrink: 0 };

  return (
    <Menu id={COMPONENT_IDS.NAVBAR_NAVBAR} style={menuStyle} attached="top" borderless inverted stackable>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Image size='small' circular src="/images/volunteer-ally-temp-logo.png" centered/>
      </Menu.Item>
      {currentUser ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} activeClassName="active" exact to="/list" key='list'> </Menu.Item>]
      ) : ''}
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} item text="Manage" key="manage-dropdown">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} exact to="/manage-database" content="Database" />
            </Dropdown.Menu>
          </Dropdown>]
      ) : ''}
      {
        // https://github.com/Semantic-Org/Semantic-UI/issues/3604
        // <Menu.Item position="right"> has bug.
      }
      <div className="right menu">
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
          <Menu.Item id={COMPONENT_IDS.NAVBAR_ADD_OPPORTUNITY} as={NavLink} activeClassName="active" exact to="/add" key='add_event'>Add Opportunity</Menu.Item>
        ) : ''}
        <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITY} as={NavLink} activeClassName="active" exact to="/browse_opportunities" key='browse_opportunity'>Browse Opportunities</Menu.Item>
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY} as={NavLink} activeClassName="active" exact to="/find_volunteers" key='organization_library'>Organization Library</Menu.Item>
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ABOUT_US} as={NavLink} activeClassName="active" exact to="/about_us" key='about_us'>About Us</Menu.Item>
        <Menu.Item>
          {currentUser === '' ? ([
            <Dropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} text="Login/SignUp" pointing="top right" icon={'user'} key='SignIn_SignOut'>
              <Dropdown.Menu>
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} icon="user" text="Sign In" as={NavLink} exact to="/signin" />
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_SIGNUP} icon="add user" text="Volunteer Sign Up" as={NavLink} exact to="/volunteer_signup" key='volunteer_signup' />
              </Dropdown.Menu>
            </Dropdown>,
          ]) : (
            <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                {Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER]) ? (
                  <Dropdown.Item id={COMPONENT_IDS.VOLUNTEER_PROFILE} icon="user" text="My Profile" as={NavLink} exact to="/volunteer-profile" />
                ) : ''}
                {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
                  <Dropdown.Item id={COMPONENT_IDS.ORGANIZATION_PROFILE} icon="user" text="My Profile" as={NavLink} exact to="/organization-profile/user" />
                ) : ''}
                <Dropdown.Item as={NavLink}
                  exact
                  to="/inbox">
                  <Icon name={'mail'}/>
                  Inbox
                  {Messages.find({ beRead: false }).fetch().length > 0 ?
                    <Label circular
                      style={{ marginBottom: '8px' }}
                      empty
                      color={'red'}/> : ''}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} exact to="organization_signup">
                  <Icon name={'building'}/>
                    Organization Sign Up
                </Dropdown.Item>
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </div>
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
  colorUsage: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const colors = ['#FF0000', '#024731', '#0000FF', '#FFFF00'];
  let colorUsage;
  if (Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) {
    colorUsage = colors[0];
  } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION])) {
    colorUsage = colors[1];
  } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
    colorUsage = colors[2];
  } else {
    colorUsage = colors[3];
  }
  return {
    currentUser,
    colorUsage,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
