import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Messages } from './MessageCollection';
import { MATRP } from '../matrp/MATRP';

export const createNewMessageMethod = new ValidatedMethod({
  name: 'Message.CreateNewMessage',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ name, subject, content, email, createdAt, beRead, recipient }) {
    console.log("Hello");
    if (Meteor.isServer) {
      console.log(name, subject, content, email, createdAt, beRead, recipient);
      Messages.define({
        name, subject, content, email, createdAt, beRead, recipient });
    }
  },
});

export const updateMessageMethod = new ValidatedMethod({
  name: 'MailCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ updateData }) {
    if (Meteor.isServer) {
      // console.log('updateMethod(%o, %o)', collectionName, updateData);
      const collection = MATRP.getCollection(Messages);
      collection.assertValidRoleForMethod(this.userId);
      collection.update(updateData.id, updateData);
    }
  },
});
