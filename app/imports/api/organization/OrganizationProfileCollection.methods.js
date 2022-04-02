import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidateMethod } from 'meteor/mdg:validated-method';
import { OrganizationProfiles } from './OrganizationProfileCollection';
import { OrganizationIndustry } from '../industry/OrganizationIndustryCollection';

export const signUpNewOrganizationMethod = new ValidateMethod({
  name: 'OrganizationProfiles.SignUpNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ organizationName, email, ein, primaryAddress, city, state, zipcodePostalcode,
    industry, primaryContactFirstName, primaryContactLastName, primaryContactEmail,
    primaryPhoneNumber, secondaryContactFirstName, secondaryContactLastName,
    secondaryContactEmail, secondaryContactPhoneNumber, username, password }) {
    if (Meteor.isServer) {
      const profileId = OrganizationProfiles.define({
        organizationName, email, ein, primaryAddress, city, state, zipcodePostalcode,
        industry, primaryContactFirstName, primaryContactLastName, primaryContactEmail,
        primaryPhoneNumber, secondaryContactFirstName, secondaryContactLastName,
        secondaryContactEmail, secondaryContactPhoneNumber, username, password });
      const organizationID = OrganizationProfiles.dumpOne(profileId);
      industry.map((industryID) => (OrganizationIndustry.define({ organizationID, industryID })));
    }
  },
});
