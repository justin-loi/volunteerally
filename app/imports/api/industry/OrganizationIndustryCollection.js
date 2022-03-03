import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class OrganizationIndustryCollection extends BaseCollection {
  constructor() {
    super('OrganizationIndustry', new SimpleSchema({
      organizationID: SimpleSchema.RegEx.Id,
      industryID: SimpleSchema.RegEx.Id,
    }));
  }

  define({ organizationID, industryID }) {
    const docID = this._collection.insert({
      organizationID,
      industryID,
    });
    return docID;
  }

  update(docID, { organizationID, industryID }) {
    const updateData = {};
    if (organizationID) {
      updateData.organizationID = organizationID;
    }
    if (industryID) {
      updateData.industryID = industryID;
    }
  }

  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER, ROLE.ORGANIZATION]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const organizationID = doc.organizationID;
    const industryID = doc.industryID;
    return { organizationID, industryID };
  }
}

export const OrganizationIndustry = new OrganizationIndustryCollection();
