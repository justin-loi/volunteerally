import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from '../user/BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Volunteers } from './VolunteerCollection';

class VolunteerProfileCollection extends BaseProfileCollection {
  constructor() {
    super('VolunteerProfile', new SimpleSchema({
      username: String,
      gender: String,
      dob: String,
      address: String,
      city: String,
      state: String,
      code: String,
      phoneNumber: String,
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param username The username for this user
   * @param email The email associated with this profile.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param gender Volunteer's gender
   * @param dob Volunteer's dob
   * @param address Volunteer's address
   * @param city Volunteer's address city
   * @param state Volunteer's address state
   * @param code Volunteer's address code
   * @param phoneNumber Volunteer's phoneNumber
   */
  define({ email, firstName, lastName, password, username, gender, dob, address, city, state, code, phoneNumber }) {
    if (Meteor.isServer) {
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.VOLUNTEER;
        const profileID = this._collection.insert({ email, firstName, lastName, userID: this.getFakeUserId(), role, gender, dob, address, city, state, code, phoneNumber });
        const userID = Volunteers.define({ username, role, password, email });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param gender new gender to change (optional).
   * @param dob new dob (optional).
   * @param address new address (optional)
   * @param city new city (optional)
   * @param state new state (optional)
   * @param code new code (optional)
   */
  update(docID, { firstName, lastName, gender, dob, address, city, state, code, phoneNumber }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (gender) {
      updateData.gender = gender;
    }
    if (dob) {
      updateData.dob = dob;
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
    if (code) {
      updateData.code = code;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER]);
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
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName };
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {VolunteerProfileCollection}
 */
export const VolunteerProfiles = new VolunteerProfileCollection();
