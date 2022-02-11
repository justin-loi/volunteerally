import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventCategories = ['animal welfare', 'environmental', 'food security', 'family services', 'crisis relief', 'education', 'elderly care', 'other'];
export const eventPublications = {
  event: 'Event',
  eventAll: 'EventAdmin',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventName: String,
      date: String,
      time: String,
      location: String,
      orgName: String,
      categories: {
        type: String,
        allowedValues: eventCategories,
        defaultValue: 'other',
      },
    }));
  }

  /**
   * Defines a new Event.
   * @param eventName the name of the event.
   * @param date the date.
   * @param time the event time.
   * @param location the event location.
   * @param orgName the event holder name.
   * @param location the event location.
   * @param categories the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ eventName, date, time, location, orgName, categories }) {
    const docID = this._collection.insert({
      eventName,
      date,
      time,
      location,
      orgName,
      categories,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param eventName the name of the event.
   * @param date the date.
   * @param time the event time.
   * @param location the event location.
   * @param orgName the event holder name.
   * @param location the event location.
   * @param categories the condition of the item.
   */
  update(docID, { eventName, date, time, location, orgName, categories }) {
    const updateData = {};
    if (eventName) {
      updateData.eventName = eventName;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (date) {
      updateData.date = date;
    }
    if (time) {
      updateData.time = time;
    }
    if (location) {
      updateData.location = location;
    }
    if (orgName) {
      updateData.orgName = orgName;
    }
    if (categories) {
      updateData.categories = categories;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(eventName) {
    const doc = this.findDoc(eventName);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin, volunteers and organizations.
   */
  publish() {
    if (Meteor.isServer) {
      // get the EventCollection instance.
      const instance = this;
      /** This subscription publishes all events regardless of user. */
      Meteor.publish(eventPublications.eventAll, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN || ROLE.VOLUNTEER || ROLE.ORGANIZATION)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for all events.
   */
  subscribeEvents() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAll);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAll);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.ORGANIZATION]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventName = doc.eventName;
    const date = doc.date;
    const time = doc.time;
    const orgName = doc.orgName;
    const location = doc.location;
    const categories = doc.categories;
    return { eventName, date, time, orgName, location, categories };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
