import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignupNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ username, email, password, timeTracker, dob, firstName, lastName, gender,
    address, city, state, zipCode_postalCode, phoneNumber,
    interests, specialSkills, environmentalPreference, availability }) {
    if (Meteor.isServer) {
      VolunteerProfiles.define({ username, email, password,
        timeTracker, dob, firstName, lastName, gender,
        address, city, state, zipCode_postalCode, phoneNumber,
        interests, specialSkills, environmentalPreference, availability });
    }
  },
});
