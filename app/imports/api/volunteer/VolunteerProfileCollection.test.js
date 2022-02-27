import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { removeAllEntities } from '../base/BaseUtilities';
import { VolunteerProfiles } from './VolunteerProfileCollection';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('VolunteerProfileCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(fc.lorem({ maxCount: 1 }), fc.lorem({ maxCount: 1 }),
          (firstName, lastName) => {
            const email = faker.internet.email();
            const docID = VolunteerProfiles.define({ email, firstName, lastName, username: email });
            expect(VolunteerProfiles.isDefined(docID)).to.be.true;
            VolunteerProfiles.removeIt(docID);
            expect(VolunteerProfiles.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

    it('Cannot define duplicates', function test2() {
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const docID1 = VolunteerProfiles.define({ email, firstName, lastName, username: email });
      const docID2 = VolunteerProfiles.define({ email, firstName, lastName, username: email });
      expect(docID1).to.equal(docID2);
    });

    it('Can update', function test3(done) {
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const password = faker.internet.password();
      const docID = VolunteerProfiles.define({ email, firstName, lastName, password, username: email });
      fc.assert(
        fc.property(fc.lorem(1), fc.lorem(1), (fName, lName) => {
          VolunteerProfiles.update(docID, { firstName: fName, lastName: lName });
          const user = VolunteerProfiles.findDoc(docID);
          expect(user.firstName).to.equal(fName);
          expect(user.lastName).to.equal(lName);
        }),
      );
      done();
    });

  });
}
