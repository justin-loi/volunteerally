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
      if (environmental !== '') {
        // console.log(environmental);
        VolunteerEnvironmental.define({ volunteerID, environmentalID: environmental });
      }
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

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log('Set Up Mail Url');
    process.env.MAIL_URL = 'smtps://stoked4kindness@gmail.com:LaChupacabra666@smtp.gmail.com:465/';
    // 'smtps://username:password@smtp.gmail.com:465/';
  });
}

export const volunteerSendEmailToOrg = new ValidatedMethod({
  name: 'Volunteer.SendEmailToOrg',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ title, content, organizationEmail, volunteerEmail }) {
    if (Meteor.isServer) {

      const subject = title;
      const text = `${content} \n\n Please, reply to: ${volunteerEmail}`;

      console.log(`send email to ${organizationEmail}`);
      // const to = `${organizationEmail}`;
      // const to = 'stoked4kindness@gmail.com';
      const to = 'jmloi@hawaii.edu';
      const from = `${volunteerEmail}`;

      // Make sure that all arguments are strings.
      check([subject, text], [String]);

      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

      Email.send({ to, from, subject, text });
    }
  },
});
