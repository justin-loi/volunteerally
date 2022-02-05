import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, password) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password });
  }
}

function createVolunteer(username, email, password, role, firstName, lastName) {
  console.log(`  Creating user username: ${username} email: ${email} with role ${role}.`);
  if (role === ROLE.VOLUNTEER) {
    VolunteerProfiles.define({ username, email, password, firstName, lastName });
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName, lastName }) => createUser(email, role, firstName, lastName, password));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
  if (Meteor.settings.defaultVolunteers) {
    console.log('Creating the default volunteer(s)');
    Meteor.settings.defaultVolunteers.map(({ username, email, password, role, firstName, lastName }) => createVolunteer(username, email, password, role, firstName, lastName));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
