import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { Interests } from './InterestCollection';
import { defineTestUser, withLoggedInUser, withSubscriptions } from '../../test-utilities/test-utilities';
import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('InterestCollection Meteor Methods', function testSuite() {
    it('Can define, update, and removeIt', async function test1() {
      const { username, password } = await defineTestUser.callPromise();
      await withLoggedInUser({ username, password });
      await withSubscriptions();
      const collectionName = Interests.getCollectionName();
      const definitionData = {};
      definitionData.name = faker.lorem.words();
      // console.log(collectionName, definitionData);
      const docID = await defineMethod.callPromise({ collectionName, definitionData });
      expect(Interests.isDefined(docID)).to.be.true;
      let doc = Interests.findDoc(docID);
      expect(doc.name).to.equal(definitionData.name);
      expect(doc.quantity).to.equal(definitionData.quantity);
      expect(doc.condition).to.equal(definitionData.condition);
      const updateData = {};
      updateData.id = docID;
      updateData.name = faker.lorem.words();
      await updateMethod.callPromise({ collectionName, updateData });
      doc = Interests.findDoc(docID);
      expect(doc.name).to.equal(updateData.name);
      await removeItMethod.callPromise({ collectionName, instance: docID });
      expect(Interests.isDefined(docID)).to.be.false;
    });
  });
}
