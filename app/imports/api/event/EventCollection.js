import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventName: String,
      eventDescription: String,
      eventDate: String,
      eventTime: String,
      eventAddress: String,
      eventState: String,
      eventZip: String,
      orgName: String,
      owner: String,
      eventCardImage: String,
      eventProfileImage: String,
      eventCity, String,
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
  define({ eventName, eventDate, eventTime, eventDescription, orgName, eventCardImage, eventProfileImage, eventAddress, eventCity, eventState, eventZip, owner }) {
    const docID = this._collection.insert({
      eventName,
      eventDate,
      eventTime,
      orgName,
      eventDescription,
      eventCardImage,
      eventProfileImage,
      eventAddress,
      eventCity,
      eventState,
      eventZip,
      owner,
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
  update(docID, { eventName, eventDate, eventTime, eventDescription, orgName, eventCardImage, eventProfileImage, eventAddress, eventCity, eventState, eventZip, owner }) {
    const updateData = {};
    if (eventName) {
      updateData.eventName = eventName;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (eventDate) {
      updateData.eventDate = eventDate;
    }
    if (eventTime) {
      updateData.eventTime = eventTime;
    }
    if (eventDescription) {
      updateData.eventDescription = eventDescription;
    }
    if (orgName) {
      updateData.orgName = orgName;
    }
    if (eventCardImage) {
      updateData.eventCardImage = eventCardImage;
    }
    if (owner) {
      updateData.owner = owner;
    }
    if (eventProfileImage) {
      updateData.eventProfileImage = eventProfileImage;
    }
    if (eventAddress) {
      updateData.eventAddress = eventAddress;
    }
    if (eventCity) {
      updateData.eventCity = eventCity;
    }
    if (eventZip) {
      updateData.eventZip = eventZip;
    }
    if (eventState) {
      updateData.eventState = eventState;
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
    const eventDate = doc.eventDate;
    const eventTime = doc.eventTime;
    const orgName = doc.orgName;
    const eventDescription = doc.eventDescription;
    const eventCardImage = doc.eventCardImage;
    const eventProfileImage = doc.eventProfileImage;
    const eventAddress = doc.eventAddress;
    const eventCity = doc.eventCity;
    const eventState = doc.eventState;
    const eventZip = doc.eventZip;
    const owner = doc.owner;
    return { eventName, eventDate, eventTime, orgName, eventDescription, eventCardImage, eventProfileImage, eventAddress, eventCity, eventState, eventZip, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
