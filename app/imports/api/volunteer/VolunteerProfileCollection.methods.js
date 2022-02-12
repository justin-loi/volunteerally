import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignUpNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber }) {
    if (Meteor.isServer) {
      VolunteerProfiles.define({
        email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber });
    }
  },
});
