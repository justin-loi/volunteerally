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

// timeTracker, dob, firstName, lastName, gender, address, city, state, zipCode_postalCode, phoneNumber, interests, specialSkills, environmentalPreference, availability
function createVolunteer(email, role, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, image) {
  console.log(`  Creating user username: ${username} email: ${email} with role ${role}.`);
  if (role === ROLE.VOLUNTEER) {
    VolunteerProfiles.define({ email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, image });
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
    Meteor.settings.defaultVolunteers.map(({ email, role, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, image }) => createVolunteer(email, role,
      firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, image));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
