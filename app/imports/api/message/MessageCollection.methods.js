import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Messages } from './MessageCollection';

export const createNewMessageMethod = new ValidatedMethod({
  name: 'Message.CreateNewMessage',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ name, subject, content, email, createdAt, beRead, recipient }) {
    if (Meteor.isServer) {
      console.log({ name, subject, content, email, createdAt, beRead, recipient });
      Messages.define({
        name, subject, content, email, createdAt, beRead, recipient });
    }
  },
});

export const updateMessageMethod = new ValidatedMethod({
  name: 'Message.UpdateMessage',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ updateData }) {
    if (Meteor.isServer) {
      // console.log('updateMethod(%o, %o)', collectionName, updateData);
      Messages.update(updateData.id, { beRead: updateData.beRead });
    }
  },
});

export const deleteMessageMethod = new ValidatedMethod({
  name: 'Message.DeleteMessage',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    if (Meteor.isServer) {
      return Messages.removeIt(instance);
    }
    return true;
  },
});
