import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Availabilities } from './AvailabilityCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('AvailabilityCollection', function testSuite() {
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
            const docID = Availabilities.define({ name });
            expect(Availabilities.isDefined(docID)).to.be.true;
            Availabilities.removeIt(docID);
            expect(Availabilities.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const name = faker.animal.dog();
      const docID1 = Availabilities.define({ name });
      const docID2 = Availabilities.define({ name });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const name = faker.lorem.words();
      const docID = Availabilities.define({ name });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
        fc.property(fc.lorem(2),
          (newName) => {
            Availabilities.update(docID, { name: newName });
            const availability = Availabilities.findDoc(docID);
            expect(availability.name).to.equal(newName);
          }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = Availabilities.findOne({});
      let docID = origDoc._id;
      const dumpObject = Availabilities.dumpOne(docID);
      Availabilities.removeIt(docID);
      expect(Availabilities.isDefined(docID)).to.be.false;
      docID = Availabilities.restoreOne(dumpObject);
      expect(Availabilities.isDefined(docID)).to.be.true;
      const doc = Availabilities.findDoc(docID);
      expect(doc.name).to.equal(origDoc.name);
    });
  });
}
