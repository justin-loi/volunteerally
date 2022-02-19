import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Interests } from './InterestCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('InterestCollection', function testSuite() {
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
            const docID = Interests.define({ name });
            expect(Interests.isDefined(docID)).to.be.true;
            Interests.removeIt(docID);
            expect(Interests.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const name = faker.animal.dog();
      const docID1 = Interests.define({ name });
      const docID2 = Interests.define({ name });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const name = faker.lorem.words();
      const docID = Interests.define({ name });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
        fc.property(fc.lorem(2),
          (newName) => {
            Interests.update(docID, { name: newName });
            const interest = Interests.findDoc(docID);
            expect(interest.name).to.equal(newName);
          }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = Interests.findOne({});
      let docID = origDoc._id;
      const dumpObject = Interests.dumpOne(docID);
      Interests.removeIt(docID);
      expect(Interests.isDefined(docID)).to.be.false;
      docID = Interests.restoreOne(dumpObject);
      expect(Interests.isDefined(docID)).to.be.true;
      const doc = Interests.findDoc(docID);
      expect(doc.name).to.equal(origDoc.name);
    });
  });
}
