import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Form, Button, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Messages } from '../../api/message/MessageCollection';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import EmailItem from '../components/EmailItem';

// Shows all messages
/*
const Inbox = ({ message, ready }) => ((ready) ? (
  <div>
    <div style={inboxStyle}>
      <Header as={'h1'}
        textAlign={'center'}
        content={'INBOX'}/>
      <Divider/>
      <div style={{ height: '80%' }}>
        {message.map((email, index) => <EmailItem email={email}
          inbox={this}
          key={index}/>)}
        {message.length <= 0 ? <Header textAlign={'center'}
          as={'h1'}
          content={'There is no message for you'}/> : ''}
      </div>
    </div>

    {openSendMail ? <div>
      <div style={popupStyle}/>
      <Segment style={innerStyle}>
        <Button icon={'close'} floated={'right'} circular onClick={handleClose}/>
        <Header as={'h1'} textAlign={'center'} content={'SEND EMAIL'}/>
        <Divider/>
        <Form onSubmit={handleSubmit}>
          <Header content={`To: ${currSendTo}`}/>
          <Form.Input required
            label='Subject'
            type='subject'
            name='subject'
            onChange={handleFormChange}
            placeholder='Subject'/>
          <Form.TextArea style={{ maxHeight: 261, height: 261 }}
            required
            label='Content'
            name='content'
            onChange={handleFormChange}
            type='content'/>
          <Form.Button content='Send' color={'blue'}/>
        </Form>
      </Segment>
    </div> : ''}
  </div>
) : <Loader active>Getting data</Loader>);

*/

const Inbox = ({ message, ready }) => {

  const [openSendMail, setOpenSendMail] = useState(false);
  const currSendTo = '';
  const currSubject = '';
  const currContent = '';

  const handleClose = () => {
    setOpenSendMail(false);
  };

  const handleFormChange = (e, { name, value }) => {
    // (temporary fix eslint)
    // eslint-disable-next-line
    [name] = value;
  };

  const handleSubmit = () => {
    const { subject, content } = { currSubject, currContent };
    const recipient = currSendTo;
    const name = VolunteerProfiles.findOne().firstName;
    const createdAt = new Date();
    const beRead = false;
    const email = Meteor.user().username;
    Messages.insert({ name, subject, content, email, createdAt, beRead, recipient });
    swal('Success', 'Message is sent', 'success');
    handleClose();
  };

  const inboxStyle = {
    width: '80%',
    height: '663.59px',
    margin: 'auto',
  };

  const popupStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  };

  const innerStyle = {
    position: 'absolute',
    width: '80%',
    left: '10%',
    top: '10%',
    margin: 'auto',
  };

  return (
    <div>
      <div style={inboxStyle}>
        <Header as={'h1'}
          textAlign={'center'}
          content={'INBOX'}/>
        <Divider/>
        <div style={{ height: '80%' }}>
          {message.map((email, index) => <EmailItem cEmail={email}
            inbox={this}
            key={index}/>)}
          {message.length <= 0 ? <Header textAlign={'center'}
            as={'h1'}
            content={'There is no message for you'}/> : ''}
        </div>
      </div>

      {openSendMail ? <div>
        <div style={popupStyle}/>
        <Segment style={innerStyle}>
          <Button icon={'close'} floated={'right'} circular onClick={handleClose}/>
          <Header as={'h1'} textAlign={'center'} content={'SEND EMAIL'}/>
          <Divider/>
          <Form onSubmit={handleSubmit}>
            <Header content={`To: ${currSendTo}`}/>
            <Form.Input required
              label='Subject'
              type='subject'
              name='subject'
              onChange={handleFormChange}
              placeholder='Subject'/>
            <Form.TextArea style={{ maxHeight: 261, height: 261 }}
              required
              label='Content'
              name='content'
              onChange={handleFormChange}
              type='content'/>
            <Form.Button content='Send' color={'blue'}/>
          </Form>
        </Segment>
      </div> : ''}
    </div>
  );
};

// Require an Event object in the props.
Inbox.propTypes = {
  message: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const messages = Messages.subscribe();
  const volunteer = VolunteerProfiles.subscribeCurrVolProfile();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const ready = messages.ready() && volunteer.ready();

  return {
    message: Messages.find({ recipient: currentUser }, { sort: { createdAt: -1 } }).fetch(),
    ready,
    volunteer,
  };

})(Inbox);
