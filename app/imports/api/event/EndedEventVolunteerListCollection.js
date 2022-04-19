import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

class EndedEventsVolunteerListCollection extends BaseCollection {
  constructor() {
    super('EndedEventsVolunteerList', new SimpleSchema({
      volunteerID: SimpleSchema.RegEx.Id,
      participateHours: Number,
      attended: Boolean,
    }));
  }

  /**
   * Defines a new Event.
   * @param volunteerID the volunteer ID
   * @param participateHours the volunteer participate hours
   * @param attended the volunteer attented to event or not
   * @return {String} the docID of the new document.
   */
  define({ volunteerID, participateHours, attended }) {
    const docID = this._collection.insert({
      volunteerID,
      participateHours,
      attended,
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
  update(docID, { participateHours, attended }) {
    const updateData = {};
    if (participateHours) {
      updateData.participateHours = participateHours;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (attended) {
      updateData.attended = attended;
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
    const volunteerID = doc.volunteerID;
    const participateHours = doc.participateHours;
    const attended = doc.attended;
    return { volunteerID, participateHours, attended };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EndedEventsVolunteerList = new EndedEventsVolunteerListCollection();
