import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';
import { VolunteerInterest } from '../interest/VolunteerInterestCollection';
import { VolunteerSkill } from '../special_skills/VolunteerSkillCollection';
import { VolunteerEnvironmental } from '../environmental_preference/VolunteerEnvironmentalCollection';
import { VolunteerAvailability } from '../availability/VolunteerAvailabilityCollection';
import { VolunteerEventHours } from '../hours/VolunteerEventHours';
import { Hours } from '../hours/HoursCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignUpNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, interests, skills, environmental, availabilities, hours = 0, image }) {
    if (Meteor.isServer) {
      const profileId = VolunteerProfiles.define({
        email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, image });
      const volunteerID = VolunteerProfiles.dumpUserId(profileId);
      // eslint-disable-next-line no-unused-expressions
      interests.map((interestID) => (VolunteerInterest.define({ volunteerID, interestID })));
      skills.map((skillID) => (VolunteerSkill.define({ volunteerID, skillID })));
      VolunteerEnvironmental.define({ volunteerID, environmentalID: environmental });
      availabilities.map((availabilityID) => (VolunteerAvailability.define({ volunteerID, availabilityID })));
      VolunteerEventHours.define({ volunteerID: volunteerID, hoursID: Hours.define({ total: hours }) });
    }
  },
});

export const editVolunteerLinkedCollectionMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.EditVolunteerLinkedCollection',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ profileID, interests, skills, environmental, availabilities }) {
    if (Meteor.isServer) {
      const volunteerID = VolunteerProfiles.dumpUserId(profileID);
      // update interests
      const volInterestsArray = VolunteerInterest.find({ volunteerID: volunteerID }, {}).fetch();
      volInterestsArray.map((volInterest) => VolunteerInterest.removeIt({ volunteerID: volInterest.volunteerID }));
      interests.map((interestID) => (VolunteerInterest.define({ volunteerID, interestID })));

      // update skills
      const volSkillsArray = VolunteerSkill.find({ volunteerID: volunteerID }, {}).fetch();
      volSkillsArray.map((volSkill) => VolunteerSkill.removeIt({ volunteerID: volSkill.volunteerID }));
      skills.map((skillID) => (VolunteerSkill.define({ volunteerID, skillID })));

      // update environmental prefer
      if (environmental !== '') {
        const doc = VolunteerEnvironmental.findDoc({ volunteerID: volunteerID });
        VolunteerEnvironmental.update(doc._id, { environmentalID: environmental });
      }

      // update availabilities
      const volAvasArray = VolunteerAvailability.find({ volunteerID: volunteerID }, {}).fetch();
      volAvasArray.map((volAva) => VolunteerAvailability.removeIt({ volunteerID: volAva.volunteerID }));
      availabilities.map((availabilityID) => (VolunteerAvailability.define({ volunteerID, availabilityID })));
    }
  },
});
