import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventInterestPublications = {
  current: 'currEventInterest',
  all: 'allEventInterest',
};

class EventInterestCollection extends BaseCollection {
  constructor() {
    super('EventInterest', new SimpleSchema({
      eventID: SimpleSchema.RegEx.Id,
      interestID: SimpleSchema.RegEx.Id,
    }));
  }

  /**
   * Define a link between a volunteer and an interest based on their ID.
   * @param eventID the event ID
   * @param interestID the interest ID
   * @return {String} the docID of the new document.
   */
  define({ eventID, interestID }) {
    const docID = this._collection.insert({
      eventID,
      interestID,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param eventID the event ID (optional)
   * @param interestID the interest ID (optional)
   */
  update(docID, { eventID, interestID }) {
    const updateData = {};
    if (eventID) {
      updateData.eventID = eventID;
    }
    if (interestID) {
      updateData.interestID = interestID;
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
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.USER, ROLE.VOLUNTEER, ROLE.ADMIN, ROLE.ORGANIZATION]);
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the eventProfile associated to an event.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventInterestPublications.current, function publish() {
        if (this.eventId) {
          return instance._collection.find({ eventID: this.eventId });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventInterestPublications.all, function publish() {
        // add role use if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
        if (this.eventId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for volunteer profile by the current user.
   */
  subscribeCurr() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventInterestPublications.current);
    }
    return null;
  }

  /**
   * Subscription method for subscribing all profile
   * It subscribes to the entire collection.
   */
  subscribe() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventInterestPublications.all);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ name, description }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventID = doc.volunteerID;
    const interestID = doc.interestID;
    return { eventID, interestID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EventInterest = new EventInterestCollection();
