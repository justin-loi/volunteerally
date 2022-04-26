import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EndedEventsVolunteerList } from './EndedEventVolunteerListCollection';
import { EndedEvent } from './EndedEventsCollection';
import { VolunteerEventHours } from '../hours/VolunteerEventHours';
import { Hours } from '../hours/HoursCollection';
import { OrganizationEvent } from './OrganizationEventCollection';
import { Events } from './EventCollection';
import { EventInterest } from '../interest/EventInterestCollection';
import { EventSkill } from '../special_skills/EventSkillCollection';
import { EventEnvironmental } from '../environmental_preference/EventEnvironmentalCollection';
import { OrganizationProfiles } from '../organization/OrganizationProfileCollection';

export const EndedEventVolunteerHoursUpdateMethod = new ValidatedMethod({
  name: 'Event.EndedEventVolunteerHoursUpdate',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ eventID, volunteerHourArray }) {
    if (Meteor.isServer) {
      // console.log(event, volunteerHourArray);
      volunteerHourArray.map((volunteer) => {
        const docID = EndedEventsVolunteerList.define({
          volunteerID: volunteer.volunteerID,
          participateHours: (volunteer.attended) ? parseFloat(volunteer.participateHours).toFixed(2) : 0,
          attended: volunteer.attended,
        });
        EndedEvent.define({ eventID: eventID, listID: docID, volunteerID: volunteer.volunteerID });
        return 0;
      });

      // update hours
      // eslint-disable-next-line array-callback-return
      volunteerHourArray.map((volunteer) => {
        const hoursID = VolunteerEventHours.findOne({ volunteerID: volunteer.volunteerID }, {});
        const hour = Hours.findOne({ _id: hoursID.hoursID }, {});
        const total = parseFloat(hour.total) + parseFloat(parseFloat(volunteer.participateHours).toFixed(2));
        // console.log(total);
        Hours.update(hoursID.hoursID, {
          total: (volunteer.attended) ? total : 0 });
        return 0;
      });
    }
  },
});

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
      return eventID;
    }
    return null;
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
