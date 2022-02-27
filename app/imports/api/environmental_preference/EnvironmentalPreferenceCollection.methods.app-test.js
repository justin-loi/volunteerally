import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { Environmental } from './EnvironmentalPreferenceCollection';
import {
  defineTestVolunteer,
  withLoggedInUser,
  withSubscriptions,
} from '../../test-utilities/test-utilities';
import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('EnvironmentalPreferenceCollection Meteor Methods', function testSuite() {
    it('Can define, update, and removeIt', async function test1() {
      const { username, password } = await defineTestVolunteer.callPromise();
      await withLoggedInUser({ username, password });
      await withSubscriptions();
      const collectionName = Environmental.getCollectionName();
      const definitionData = {};
      definitionData.name = faker.lorem.words();
      // console.log(collectionName, definitionData);
      const docID = await defineMethod.callPromise({ collectionName, definitionData });
      expect(Environmental.isDefined(docID)).to.be.true;
      let doc = Environmental.findDoc(docID);
      expect(doc.name).to.equal(definitionData.name);
      const updateData = {};
      updateData.id = docID;
      updateData.name = faker.lorem.words();
      await updateMethod.callPromise({ collectionName, updateData });
      doc = Environmental.findDoc(docID);
      expect(doc.name).to.equal(updateData.name);
      await removeItMethod.callPromise({ collectionName, instance: docID });
      expect(Environmental.isDefined(docID)).to.be.false;
      Meteor.logout();
    });
  });
}
