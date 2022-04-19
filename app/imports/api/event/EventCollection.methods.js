import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationEvent } from './OrganizationEventCollection';
import { Events } from './EventCollection';
import { EventInterest } from '../interest/EventInterestCollection';
import { EventSkill } from '../special_skills/EventSkillCollection';
import { EventEnvironmental } from '../environmental_preference/EventEnvironmentalCollection';
import { OrganizationProfiles } from '../organization/OrganizationProfileCollection';

export const addNewEventMethod = new ValidatedMethod({
  name: 'Event.addNewEventMethod',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ eventName, eventDescription, eventDate, eventStartTime, eventEndTime, eventAddress, eventState, eventZip, orgName, owner, eventProfileImage, eventCity, interests, skills, environmental }) {
    if (Meteor.isServer) {
      const eventID = Events.define({
        eventName, eventDescription, eventDate, eventStartTime, eventEndTime, eventAddress, eventState, eventZip, orgName, owner, eventProfileImage, eventCity });
      // console.log(eventID);
      // eslint-disable-next-line no-unused-expressions
      interests.map((interestID) => (EventInterest.define({ eventID, interestID })));
      skills.map((skillID) => (EventSkill.define({ eventID, skillID })));
      if (environmental !== '') {
        // console.log(environmental);
        EventEnvironmental.define({ eventID, environmentalID: environmental });
      }
      const organization = OrganizationProfiles.findOne({ email: owner }, {});
      OrganizationEvent.define({ eventID: eventID, organizationID: organization.userID });
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
