import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class HoursCollection extends BaseCollection {
  constructor() {
    super('Hours', new SimpleSchema({
      total: Number,
    }));
  }

  /**
   * Defines a new amount of Hours.
   * @param name the name of the interest.
   * @param description interest's description (optional).
   * @return {String} the docID of the new document.
   */
  define({ total }) {
    const docID = this._collection.insert({
      total,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param total, the new total (optional).
   */
  update(docID, { total }) {
    const updateData = {};
    if (total) {
      updateData.name = total;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(total) {
    const doc = this.findDoc(total);
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
   * @return {{ name, description }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const total = doc.total;
    return { total };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Hours = new HoursCollection();
