import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const volunteerPublications = {
  volunteer: 'Volunteer',
  volunteerAdmin: 'VolunteerAdmin',
};
export const volunteerGender = ['Female', 'Male', 'Other', 'Prefer Not To Say'];

// firstName, lastName, gender, primaryAddress, city, state, zipCode_postalCode, phoneNumber, interests, specialSkill, environmentalPreference, availability
class VolunteerCollection extends BaseCollection {
  constructor() {
    super('Volunteers', new SimpleSchema({
      owner: String,
      firstName: String,
      lastName: String,
      gender: {
        type: String,
        allowedValues: volunteerGender,
      },
      primaryAddress: String,
      city: String,
      state: String,
      zipCode_postalCode: String,
      phoneNumber: String,
      interests: { type: String, required: false },
      specialSkill: { type: String, required: false },
      environmentalPreference: { type: String, required: false },
      availability: { type: String, required: false },
    }));
  }

  /**
   * Defines a new Volunteer.
   * @param owner the owner of this information.
   * @param firstName volunteer's first name.
   * @param lastName volunteer's last name.
   * @param gender volunteer's gender.
   * @param primaryAddress volunteer's address.
   * @param city volunteer's city.
   * @param state volunteer's state.
   * @param zipCode_postalCode volunteer's zip/postal code.
   * @param phoneNumber volunteer's phone number.
   * @param interests volunteer's interests.
   * @param specialSkill volunteer's special skill
   * @param environmentalPreference volunteer's environmental preference
   * @param availability volunteer's availability
   * @return {String} the docID of the new document.
   */
  define({ owner, firstName, lastName, gender, primaryAddress, city, state, zipCode_postalCode, phoneNumber, interests, specialSkill, environmentalPreference, availability }) {
    const docID = this._collection.insert({
      owner,
      firstName,
      lastName, gender,
      primaryAddress,
      city,
      state,
      zipCode_postalCode,
      phoneNumber,
      interests,
      specialSkill,
      environmentalPreference,
      availability,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param firstName volunteer's first name (optional).
   * @param lastName volunteer's last name (optional).
   * @param gender volunteer's gender (optional).
   * @param primaryAddress volunteer's address (optional).
   * @param city volunteer's city (optional).
   * @param state volunteer's state (optional).
   * @param zipCode_postalCode volunteer's zip/postal code (optional).
   * @param phoneNumber volunteer's phone number (optional).
   * @param interests volunteer's interests (optional).
   * @param specialSkill volunteer's special skill (optional).
   * @param environmentalPreference volunteer's environmental preference (optional).
   * @param availability volunteer's availability (optional).
   */
  update(docID, { firstName, lastName, gender, primaryAddress, city, state, zipCode_postalCode, phoneNumber, interests, specialSkill, environmentalPreference, availability }) {
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
    if (primaryAddress) {
      updateData.primaryAddress = primaryAddress;
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
    if (specialSkill) {
      updateData.specialSkill = specialSkill;
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
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the volunteer associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the VolunteerCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(volunteerPublications.volunteer, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(volunteerPublications.volunteerAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for volunteer owned by the current user.
   */
  subscribeVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerPublications.volunteer);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerPublications.volunteerAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const owner = doc.owner;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const gender = doc.gender;
    const primaryAddress = doc.primaryAddress;
    const city = doc.city;
    const state = doc.state;
    const zipCode_postalCode = doc.zipCode_postalCode;
    const phoneNumber = doc.phoneNumber;
    const interests = doc.interests;
    const specialSkill = doc.specialSkill;
    const environmentalPreference = doc.environmentalPreference;
    const availability = doc.availability;
    return { owner, firstName, lastName, gender, primaryAddress, city, state, zipCode_postalCode, phoneNumber, interests, specialSkill, environmentalPreference, availability };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Volunteers = new VolunteerCollection();
