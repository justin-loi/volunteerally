import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Messages } from './MessageCollection';

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
