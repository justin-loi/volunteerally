import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class SpecialSkillCollection extends BaseCollection {
  constructor() {
    super('SpecialSkills', new SimpleSchema({
      name: String,
      description: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Special Skills.
   * @param name the name of the skills.
   * @param description the skill description (optional)
   * @return {String} the docID of the new document.
   */
  define({ name, description }) {
    const docID = this._collection.insert({
      name,
      description,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new skill name (optional).
   * @param description the new description (optional).
   */
  update(docID, { name, description }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (description) {
      updateData.description = description;
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
   * @return {{ name, description }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const SpecialSkills = new SpecialSkillCollection();
