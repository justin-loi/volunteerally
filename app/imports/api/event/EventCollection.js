import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventName: String,
      date: String,
      time: String,
      location: String,
      orgName: String,
      categories: String,
      environmentType: String,
      owner: String,
      skillsNeeded: String,
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
   * @param environmentType the condition of the item.
   * @param owner the condition of the item.
   * @param skillsNeeded the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ eventName, date, time, location, orgName, categories, environmentType, owner, skillsNeeded }) {
    const docID = this._collection.insert({
      eventName,
      date,
      time,
      location,
      orgName,
      categories,
      environmentType,
      owner,
      skillsNeeded,
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
  update(docID, { eventName, date, time, location, orgName, categories, environmentType, owner, skillsNeeded }) {
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
    if (environmentType) {
      updateData.environmentType = environmentType;
    }
    if (skillsNeeded) {
      updateData.skillsNeeded = skillsNeeded;
    }
    if (owner) {
      updateData.owner = owner;
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
    const owner = doc.owner;
    const environmentType = doc.owner;
    const skillsNeeded = doc.skillsNeeded;
    return { eventName, date, time, orgName, location, categories, environmentType, skillsNeeded, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
