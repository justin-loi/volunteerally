import React, { useState } from 'react';
import { Grid, Container, Icon, Button, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Messages } from '../../api/message/MessageCollection';
import { updateMessageMethod } from '../../api/message/MessageCollection.methods';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EmailItem = ({ email, inbox }) => {

  const [openContent, setOpenContent] = useState(false);

  const handleRead = () => {
    const updateData = {id: email._id, beRead: true};
    updateMessageMethod.callPromise({ updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));

    console.log(email._id);
    setOpenContent(false);
    console.log('I got pressed');
  };

  const handleDelete = () => {
    swal({
      title: 'Delete Email',
      text: 'You are going to delete this email',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Confirm',
      },
    }).then((value) => {
      if (value) Messages.remove({ _id: email._id });
    });
  };

  const handleOpenSendEmail = () => {
    setOpenContent(true);
    inbox.setState({ sendTo: email.email });
  };

  return (
    <div>
      <Segment style={{ cursor: 'pointer', width: '100%' }} onClick={handleRead}>
        <Grid>
          <Grid.Column width={1}>{email.beRead ? <Icon size={'large'} name={'envelope open outline'}/>
            : <Icon size={'large'} name={'envelope'}/>}
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={2}/>
          <Grid.Column width={4}>{email.subject}</Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={3}>{email.email}</Grid.Column>
          <Grid.Column width={1}>{email.createdAt.toLocaleDateString('en-US')}</Grid.Column>
          <Grid.Column floated={'right'}><Button size={'tiny'} icon={'close'}
            onClick={handleDelete}/></Grid.Column>
        </Grid>
      </Segment>

      {openContent ? <Container style={{ width: '85%' }}>
        {email.content}
        <Divider/>
        {inbox ?
          <div><Button content={'Reply'} onClick={handleOpenSendEmail} icon={'reply'}/><Divider hidden/></div> : ''}
      </Container> : ''}
    </div>
  );
};

// Require a document to be passed to this component.
EmailItem.propTypes = {
  email: PropTypes.object.isRequired,
  inbox: PropTypes.object,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EmailItem);
