import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from '../user/BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from '../user/UserCollection';

class OrganizationProfileCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an Organization and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The organization representative first name.
   * @param lastName The organization representative last name.
   * @param logoImage The logo.
   * @param eventBackgroundImage The event page background image.
   * @param organizationName The organization name.
   * @param phoneNumber The volunteer representative phone number.
   * @param missionStatement The mission statement.
   */
  define({ email, firstName, lastName, password, logoImage, eventBackgroundImage, organizationName, phoneNumber, missionStatement }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.ORGANIZATION;
        const profileID = this._collection.insert({ email, firstName, lastName, logoImage, eventBackgroundImage, organizationName, phoneNumber, missionStatement, userID: this.getFakeUserId(), role });
        const userID = Users.define({ username, role, password });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the OrganizationProfile. You cannot change the email or role.
   * @param docID the id of the OrganizationProfile
   * @param firstName new first name.
   * @param lastName new last name.
   * @param firstName update the organization representative first name.
   * @param lastName update organization representative last name.
   * @param logoImage update the logo.
   * @param eventBackgroundImage update the event page background image.
   * @param organizationName update the organization name.
   * @param phoneNumber update the volunteer representative phone number.
   * @param missionStatement update the mission statement.
   */
  update(docID, { firstName, lastName, logoImage, eventBackgroundImage, organizationName, phoneNumber, missionStatement }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (logoImage) {
      updateData.lastName = lastName;
    }
    if (eventBackgroundImage) {
      updateData.lastName = lastName;
    }
    if (organizationName) {
      updateData.lastName = lastName;
    }
    if (phoneNumber) {
      updateData.lastName = lastName;
    }
    if (missionStatement) {
      updateData.lastName = lastName;
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
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.ORGANIZATION]);
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
      if (doc.role !== ROLE.ORGANIZATION) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the OrganizationProfile docID in a format acceptable to define().
   * @param docID The docID of a OrganizationProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const logoImage = doc.logoImage;
    const eventBackgroundImage = doc.eventBackgroundImage;
    const phoneNumber = doc.phoneNumber;
    const missionStatement = doc.missionStatement;
    const organizationName = doc.organizationName;
    return { email, firstName, lastName, logoImage, eventBackgroundImage, phoneNumber, missionStatement, organizationName };
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {OrganizationProfileCollection}
 */
export const OrganizationProfiles = new OrganizationProfileCollection();
