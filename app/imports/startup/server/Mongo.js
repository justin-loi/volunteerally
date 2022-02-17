import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { Availabilities } from '../../api/availability/AvailabilityCollection';
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

function addEvent(data) {
  console.log(`  Adding: ${data.eventName} (${data.orgName})`);
  Events.define(data);
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.map(data => addEvent(data));
  }
}

function addOrganization(data) {
  console.log(`  Adding: ${data.email} (${data.organizationName})`);
  OrganizationProfiles.define(data);
}

if (OrganizationProfiles.count() === 0) {
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating default organizations.');
    Meteor.settings.defaultOrganizations.map(data => addOrganization(data));
  }
}

function addInterest(data) {
  console.log(`  Adding interest: ${data.name} with description: ${data.description}`);
  Interests.define(data);
}

if (Interests.count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default Interests.');
    Meteor.settings.defaultInterests.map(data => addInterest(data));
  }
}

function addSpecialSkills(data) {
  console.log(`  Adding special skills: ${data.name} with description: ${data.description}`);
  SpecialSkills.define(data);
}

if (SpecialSkills.count() === 0) {
  if (Meteor.settings.defaultSpecialSkills) {
    console.log('Creating default Special Skills.');
    Meteor.settings.defaultSpecialSkills.map(data => addSpecialSkills(data));
  }
}

function addEnvironmentalPreferences(data) {
  console.log(`  Adding Environmental Preferences: ${data.preference} with description: ${data.description}`);
  Environmental.define(data);
}

if (Environmental.count() === 0) {
  if (Meteor.settings.defaultEnvironmentalPreferences) {
    console.log('Creating default Special Skills.');
    Meteor.settings.defaultEnvironmentalPreferences.map(data => addEnvironmentalPreferences(data));
  }
}

function addAvailabilities(data) {
  console.log(`  Adding availabilities: ${data.name} with description: ${data.description}`);
  Availabilities.define(data);
}

if (Availabilities.count() === 0) {
  if (Meteor.settings.defaultAvailabilities) {
    console.log('Creating default Special Skills.');
    Meteor.settings.defaultAvailabilities.map(data => addAvailabilities(data));
  }
}
