import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';
import { VolunteerInterest } from '../interest/VolunteerInterestCollection';
import { VolunteerSkill } from '../special_skills/VolunteerSkillCollection';
import { VolunteerEnvironmental } from '../environmental_preference/VolunteerEnvironmentalCollection';
import { VolunteerAvailability } from '../availability/VolunteerAvailabilityCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignUpNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber, interests, skills, environmental, availabilities }) {
    if (Meteor.isServer) {
      const volunteerID = VolunteerProfiles.define({
        email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber });
      // eslint-disable-next-line no-unused-expressions
      interests.map((interestID) => (VolunteerInterest.define({ volunteerID, interestID })));
      skills.map((skillID) => (VolunteerSkill.define({ volunteerID, skillID })));
      VolunteerEnvironmental.define({ volunteerID, environmentalID: environmental });
      availabilities.map((availabilityID) => (VolunteerAvailability.define({ volunteerID, availabilityID })));
    }
  },
});
