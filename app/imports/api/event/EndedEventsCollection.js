import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class EndedEventsCollection extends BaseCollection {
  constructor() {
    super('EndedEvent', new SimpleSchema({
      eventID: SimpleSchema.RegEx.Id,
      listID: SimpleSchema.RegEx.Id,
      volunteerID: SimpleSchema.RegEx.Id,
    }));
  }

  /**
   * Define a link between a volunteer and an event based on their ID.
   * @param eventID the event ID
   * @return {String} the docID of the new document.
   */
  define({ eventID, listID, volunteerID }) {
    const docID = this._collection.insert({
      eventID,
      listID,
      volunteerID,
    });
    return docID;
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
   * @return {{ eventID }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventID = doc.eventID;
    const listID = doc.listID;
    const volunteerID = doc.volunteerID;
    return { eventID, listID, volunteerID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EndedEvent = new EndedEventsCollection();
