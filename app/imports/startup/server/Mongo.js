import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Volunteers } from '../../api/volunteer/VolunteerCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the database with a default volunteer data document.
function addVolunteer(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Volunteers.define(data);
}

// Initialize the VolunteerCollection if empty.
if (Volunteers.count() === 0) {
  if (Meteor.settings.defaultVolunteer) {
    console.log('Creating default Volunteer data.');
    Meteor.settings.defaultVolunteer.map(data => addVolunteer(data));
  }
}
