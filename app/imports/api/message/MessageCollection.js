import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

class MessageCollection extends BaseCollection {
  constructor() {
    super('Messages', new SimpleSchema({
      name: String,
      subject: String,
      content: String,
      email: String,
      createdAt: Date,
      beRead: Boolean,
      recipient: String,
    }));
  }

  /**
   * Defines a new Message.
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
  define({ name, subject, content, email, createdAt, beRead, recipient }) {
    const docID = this._collection.insert({
      name,
      subject,
      content,
      email,
      createdAt,
      beRead,
      recipient,
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
  update(docID, { name, subject, content, email, createdAt, beRead, recipient }) {
    console.log(docID);
    console.log(beRead);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (subject) {
      updateData.subject = subject;
    }
    if (content) {
      updateData.content = content;
    }
    if (email) {
      updateData.email = email;
    }
    if (createdAt) {
      updateData.createdAt = createdAt;
    }
    if (beRead) {
      updateData.beRead = beRead;
    }
    if (recipient) {
      updateData.recipient = recipient;
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
    const name = doc.name;
    const subject = doc.subject;
    const content = doc.content;
    const email = doc.email;
    const createdAt = doc.createdAt;
    const beRead = doc.beRead;
    const recipient = doc.recipient;
    return { name, subject, content, email, createdAt, beRead, recipient };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Messages = new MessageCollection();
