import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { SpecialSkills } from './SpecialSkillCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('SpecialSkillsCollection', function testSuite() {
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
            const docID = SpecialSkills.define({ name });
            expect(SpecialSkills.isDefined(docID)).to.be.true;
            SpecialSkills.removeIt(docID);
            expect(SpecialSkills.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const name = faker.animal.dog();
      const docID1 = SpecialSkills.define({ name });
      const docID2 = SpecialSkills.define({ name });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const name = faker.lorem.words();
      const docID = SpecialSkills.define({ name });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
        fc.property(fc.lorem(2),
          (newName) => {
            SpecialSkills.update(docID, { name: newName });
            const skill = SpecialSkills.findDoc(docID);
            expect(skill.name).to.equal(newName);
          }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = SpecialSkills.findOne({});
      let docID = origDoc._id;
      const dumpObject = SpecialSkills.dumpOne(docID);
      SpecialSkills.removeIt(docID);
      expect(SpecialSkills.isDefined(docID)).to.be.false;
      docID = SpecialSkills.restoreOne(dumpObject);
      expect(SpecialSkills.isDefined(docID)).to.be.true;
      const doc = SpecialSkills.findDoc(docID);
      expect(doc.name).to.equal(origDoc.name);
    });
  });
}
