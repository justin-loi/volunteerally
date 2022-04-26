import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Icon, Button, Segment, Divider, Header, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/message/MessageCollection';
import {
  updateMessageMethod,
  deleteMessageMethod,
  createNewMessageMethod,
} from '../../api/message/MessageCollection.methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EmailItem = ({ cEmail, inbox }) => {

  const [openContent, setOpenContent] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [cSubject, setSubject] = useState('');
  const [cContent, setContent] = useState('');

  const handleOpen = () => {
    setOpenReply(true);
  };

  const handleClose = () => {
    setOpenReply(false);
  };

  const handleContentChange = (e, { value }) => {
    setContent(value);
  };

  const handleSubjectChange = (e, { value }) => {
    setSubject(value);
  };

  const handleSendSubmit = () => {
    const recipient = cEmail.email;
    const name = Meteor.user().username;
    const beRead = false;
    const createdAt = new Date();
    const email = cEmail.recipient;
    const subject = cSubject;
    const content = cContent;
    console.log({ name, subject, content, email, createdAt, beRead, recipient });
    createNewMessageMethod.callPromise({ name, subject, content, email, createdAt, beRead, recipient })
      .catch(error => {
        swal('Error', error.message, 'error');
      })
      .then(() => {
        // Not sure why it catches the error but still executes
        setContent('');
        setSubject('');
        swal({
          title: 'Message Sent',
          text: 'Your message has been sent',
          icon: 'success',
          timer: 1500,
        });
      });

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
    // width: '504px',
    width: '50%',
    left: '25%',
    top: '25%',
    margin: 'auto',
  };

  const handleRead = () => {
    const updateData = { id: cEmail._id, beRead: true };
    updateMessageMethod.callPromise({ updateData })
      .catch(error => swal('Error', error.message, 'error'));
    setOpenContent(true);
  };

  const handleDelete = () => {
    swal({
      title: 'Delete Email',
      text: 'You are going to delete this email',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Confirm',
      },
    }).then(() => {
      deleteMessageMethod.callPromise(cEmail)
        .catch(error => swal('Error', error.message, 'error'));
    });
    setOpenContent(false);
  };

  return (
    <div>
      <Segment style={{ cursor: 'pointer', width: '100%' }} onClick={handleRead}>
        <Grid>
          <Grid.Column width={1}>{cEmail.beRead ? <Icon size={'large'} name={'envelope open outline'}/>
            : <Icon size={'large'} name={'envelope'}/>}
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={2}/>
          <Grid.Column width={4}>{cEmail.subject}</Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={3}>{cEmail.email}</Grid.Column>
          <Grid.Column width={1}>{cEmail.createdAt.toLocaleDateString('en-US')}</Grid.Column>
          <Grid.Column floated={'right'}><Button size={'tiny'} icon={'close'}
            onClick={handleDelete}/></Grid.Column>
        </Grid>
      </Segment>

      {openContent ? <Container style={{ width: '85%' }}>
        {cEmail.content}
        <Divider/>
        {inbox ?
          <div><Button content={'Reply'} onClick={handleOpen} icon={'reply'}/><Divider hidden/></div> : ''}
      </Container> : ''}

      {openReply ?
        <div>
          <div style={popupStyle}/>
          <Segment style={innerStyle}>
            <Button icon={'close'} floated={'right'} circular onClick={handleClose}/>
            <Header as={'h1'} textAlign={'center'} content={'SEND MESSAGE'}/>
            <Divider/>
            <Form onSubmit={handleSendSubmit}>
              <Header content={`To: ${cEmail.email}`}/>
              <Form.Input required
                label='Subject'
                type='subject'
                name='subject'
                onChange={handleSubjectChange}
                placeholder='Subject'/>
              <Form.TextArea style={{ maxHeight: 261, height: 261 }}
                required
                label='Content'
                name='content'
                onChange={handleContentChange}
                type='content'/>
              <Form.Button content='Send' color={'blue'}/>
            </Form>
          </Segment>
        </div> : ''}

    </div>
  );
};

// Require a document to be passed to this component.
EmailItem.propTypes = {
  cEmail: PropTypes.object.isRequired,
  inbox: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const EmailItemContainer = withTracker(() => {
  // eslint-disable-next-line no-unused-vars
  const sub = Messages.subscribe();
})(EmailItem);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EmailItemContainer);
