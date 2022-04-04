import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationEvent } from './OrganizationEventCollection';
import { Events } from './EventCollection';
import { OrganizationProfiles } from './OrganizationProfileCollection';
import { EventInterest } from '../interest/EventInterestCollection';
import { EventSkill } from '../special_skills/EventSkillCollection';
import { EventEnvironmental } from '../environmental_preference/EventEnvironmentalCollection';

export const addNewEventMethod = new ValidatedMethod({
  name: 'Events.AddNewEvent',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ owner, orgName, eventDescription, eventLocation, eventTime, eventDate, eventCardImage, eventProfileImage, interests, skills, environmental }) {
    if (Meteor.isServer) {
      const eventId = Events.define({
        owner, orgName, eventDescription, eventLocation, eventTime, eventDate, eventCardImage, eventProfileImage });
      const eventID = Events.getID(owner);
      // eslint-disable-next-line no-unused-expressions
      interests.map((interestID) => (EventInterest.define({ eventID, interestID })));
      skills.map((skillID) => (EventSkill.define({ eventID, skillID })));
      if (environmental !== '') {
        // console.log(environmental);
        EventEnvironmental.define({ eventID, environmentalID: environmental });
      }
      const organizationID = OrganizationProfiles.getID(owner);
      OrganizationEvent.define(organizationID, eventId);
    }
  },
});

export const editEventLinkedCollectionMethod = new ValidatedMethod({
  name: 'EventProfiles.EditEventLinkedCollection',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ eventID, interests, skills, environmental }) {
    if (Meteor.isServer) {
      // update interests
      const eventInterestsArray = EventInterest.find({ eventID: eventID }, {}).fetch();
      eventInterestsArray.map((eventInterest) => EventInterest.removeIt({ eventID: eventInterest.eventID }));
      interests.map((interestID) => (EventInterest.define({ eventID, interestID })));

      // update event skills
      const eventSkillsArray = EventSkill.find({ eventID: eventID }, {}).fetch();
      eventSkillsArray.map((eventSkill) => eventSkill.removeIt({ volunteerID: eventSkill.eventID }));
      skills.map((skillID) => (EventSkill.define({ eventID, skillID })));

      // update environmental prefer
      if (environmental !== '') {
        const doc = EventEnvironmental.findDoc({ eventID: eventID });
        EventEnvironmental.update(doc._id, { environmentalID: environmental });
      }
    }
  },
});
