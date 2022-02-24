import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Environmental } from './EnvironmentalPreferenceCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('EnvironmentalPreferenceCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(fc.lorem(2),
          (name) => {
            const docID = Environmental.define({ name });
            expect(Environmental.isDefined(docID)).to.be.true;
            Environmental.removeIt(docID);
            expect(Environmental.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const name = faker.animal.dog();
      const docID1 = Environmental.define({ name });
      const docID2 = Environmental.define({ name });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const name = faker.lorem.words();
      const docID = Environmental.define({ name });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
        fc.property(fc.lorem(2),
          (newName) => {
            Environmental.update(docID, { name: newName });
            const environmental = Environmental.findDoc(docID);
            expect(environmental.name).to.equal(newName);
          }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = Environmental.findOne({});
      let docID = origDoc._id;
      const dumpObject = Environmental.dumpOne(docID);
      Environmental.removeIt(docID);
      expect(Environmental.isDefined(docID)).to.be.false;
      docID = Environmental.restoreOne(dumpObject);
      expect(Environmental.isDefined(docID)).to.be.true;
      const doc = Environmental.findDoc(docID);
      expect(doc.name).to.equal(origDoc.name);
    });
  });
}
