import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class OrganizationEventCollection extends BaseCollection {
  constructor() {
    super('OrganizationEvent', new SimpleSchema({
      organizationID: SimpleSchema.RegEx.Id,
      eventID: SimpleSchema.RegEx.Id,
    }));
  }

  /**
   * Define a link between a organization and an event based on their ID.
   * @param organizationID the organization ID
   * @param eventID the event ID
   * @return {String} the docID of the new document.
   */
  define({ organizationID, eventID }) {
    const docID = this._collection.insert({
      organizationID,
      eventID,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param organizationID the organization ID (optional)
   * @param eventID the event ID (optional)
   */
  update(docID, { organizationID, eventID }) {
    const updateData = {};
    if (organizationID) {
      updateData.volunteerID = organizationID;
    }
    if (eventID) {
      updateData.eventID = eventID;
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
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER, ROLE.ORGANIZATION]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ eventID, organizationIDInterestCollection.js }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const volunteerID = doc.volunteerID;
    const eventID = doc.eventID;
    return { volunteerID, eventID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OrganizationEvent = new OrganizationEventCollection();
