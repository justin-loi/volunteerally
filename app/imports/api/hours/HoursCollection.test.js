import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Hours } from './HoursCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('HoursCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(fc.integer(0, 8), (hours) => {
          const docID = Hours.define({ total: hours });
          expect(Hours.isDefined(docID)).to.be.true;
          Hours.removeIt(docID);
          expect(Hours.isDefined(docID)).to.be.false;
        }),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const total = faker.datatype.number({ min: 1, max: 5 });
      const docID1 = Hours.define({ total });
      const docID2 = Hours.define({ total });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const total = faker.datatype.number({ min: 1, max: 5 });
      const docID = Hours.define({ total: total });
      // console.log(Hours.findDoc(docID));
      fc.assert(
        fc.property(fc.integer(10),
          (newTotal) => {
            Hours.update(docID, { total: newTotal });
            const hoursDoc = Hours.findDoc(docID);
            expect(hoursDoc.total).to.equal(newTotal);
          }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = Hours.findOne({});
      let docID = origDoc._id;
      const dumpObject = Hours.dumpOne(docID);
      Hours.removeIt(docID);
      expect(Hours.isDefined(docID)).to.be.false;
      docID = Hours.restoreOne(dumpObject);
      expect(Hours.isDefined(docID)).to.be.true;
      const doc = Hours.findDoc(docID);
      expect(doc.total).to.equal(origDoc.total);
    });
  });
}
