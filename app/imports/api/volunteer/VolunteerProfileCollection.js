import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Volunteers } from './VolunteerCollection';

class VolunteerProfileCollection extends BaseProfileCollection {
  constructor() {
    super('VolunteerProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an Volunteer and the associated Meteor account.
   * @param username volunteer account's username.
   * @param email The email associated with this profile. Can also be username
   * @param password The password for this user.
   * @param timeTracker volunteer's trackTime
   * @param dob volunteer's date of birth
   * @param firstName The first name.
   * @param lastName The last name.
   * @param gender volunteer's gender.
   * @param address volunteer's address.
   * @param city volunteer's city.
   * @param state volunteer's state.
   * @param zipCode_postalCode volunteer's zip/postal code.
   * @param phoneNumber volunteer's phone number.
   * @param interests volunteer's interests.
   * @param specialSkills volunteer's special skill
   * @param environmentalPreference volunteer's environmental preference
   * @param availability volunteer's availability
   */
  // timeTracker, dob, firstName, lastName, gender, address, city, state, zipCode_postalCode, phoneNumber, interests, specialSkills, environmentalPreference, availability
  define({ username, email, password, timeTracker, dob, firstName, lastName, gender,
    address, city, state, zipCode_postalCode, phoneNumber,
    interests, specialSkills, environmentalPreference, availability }) {
    if (Meteor.isServer) {
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.VOLUNTEER;
        const profileID = this._collection.insert({ email, timeTracker, dob, firstName, lastName, gender,
          address, city, state, zipCode_postalCode, phoneNumber,
          interests, specialSkills, environmentalPreference, availability,
          userID: this.getFakeUserId(), role });
        const userID = Volunteers.define({ username, email, password, role });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the VolunteerProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param timeTracker volunteer's trackTime
   * @param dob volunteer's date of birth
   * @param firstName The first name.
   * @param lastName The last name.
   * @param gender volunteer's gender.
   * @param address volunteer's address.
   * @param city volunteer's city.
   * @param state volunteer's state.
   * @param zipCode_postalCode volunteer's zip/postal code.
   * @param phoneNumber volunteer's phone number.
   * @param interests volunteer's interests.
   * @param specialSkills volunteer's special skill
   * @param environmentalPreference volunteer's environmental preference
   * @param availability volunteer's availability
   */
  update(docID, { timeTracker, dob, firstName, lastName, gender,
    address, city, state, zipCode_postalCode, phoneNumber,
    interests, specialSkills, environmentalPreference, availability }) {
    this.assertDefined(docID);
    const updateData = {};
    if (timeTracker) {
      updateData.timeTracker = timeTracker;
    }
    if (dob) {
      updateData.dob = dob;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (gender) {
      updateData.gender = gender;
    }
    if (address) {
      updateData.address = address;
    }
    if (city) {
      updateData.city = city;
    }
    if (state) {
      updateData.state = state;
    }
    if (zipCode_postalCode) {
      updateData.zipCode_postalCode = zipCode_postalCode;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (interests) {
      updateData.interests = interests;
    }
    if (specialSkills) {
      updateData.specialSkills = specialSkills;
    }
    if (environmentalPreference) {
      updateData.environmentalPreference = environmentalPreference;
    }
    if (availability) {
      updateData.availability = availability;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.VOLUNTEER]);
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.VOLUNTEER) {
        problems.push(`VolunteerProfile instance does not have ROLE.VOLUNTEER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the VolunteerProfile docID in a format acceptable to define().
   * @param docID The docID of a VolunteerProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { username, email, firstName, lastName };
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {VolunteerProfileCollection}
 */
export const VolunteerProfiles = new VolunteerProfileCollection();
