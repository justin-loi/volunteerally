import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationProfiles } from './OrganizationProfileCollection';
import { OrganizationIndustry } from '../industry/OrganizationIndustryCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'OrganizationProfiles.SignUpNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ organizationName, email, ein, primaryAddress, city, state, zipcode,
    industry, primaryContactFirstName, primaryContactLastName, primaryContactEmail,
    primaryContactPhone, secondContactFirstName, secondContactLastName,
    secondContactEmail, secondContactPhone, username, password, industries }) {
    if (Meteor.isServer) {
      const profileId = OrganizationProfiles.define({
        organizationName, email, ein, primaryAddress, city, state, zipcode,
        industry, primaryContactFirstName, primaryContactLastName, primaryContactEmail,
        primaryContactPhone, secondContactFirstName, secondContactLastName,
        secondContactEmail, secondContactPhone, username, password });
      const organizationID = OrganizationProfiles.dumpUserId(profileId);
      industries.map((industryID) => (OrganizationIndustry.define({ organizationID, industryID })));
    }
  },
});
