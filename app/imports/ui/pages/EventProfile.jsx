import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Form, Divider, Loader, Grid, Icon, Segment, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
import { createNewMessageMethod } from '../../api/message/MessageCollection.methods';
// import { ROLE } from '../../api/role/Role';

// Renders a Event Info page that connects with the current Event collection.
const EventProfile = ({ currentUser, event, orgProfile, skills, environments, interests, ready }) => {
  const [openSendMail, setOpenSendMail] = useState(false);
  const [cSubject, setSubject] = useState('');
  const [cContent, setContent] = useState('');

  const getDirections = () => {
    const link = `https://www.google.com/maps/place/${event.eventAddress}`;
    window.open(link);
  };

  const handleOpen = () => {
    setOpenSendMail(true);
  };

  const handleClose = () => {
    setOpenSendMail(false);
  };

  const handleContentChange = (e, { value }) => {
    setContent(value);
  };

  const handleSubjectChange = (e, { value }) => {
    setSubject(value);
  };

  const handleSendSubmit = () => {
    const recipient = orgProfile.email;
    const name = currentUser;
    const beRead = false;
    const createdAt = new Date();
    const email = Meteor.user().username;
    const subject = cSubject;
    const content = cContent;
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
    width: '50%',
    left: '25%',
    top: '25%',
    margin: 'auto',
  };

  return (
    ((ready) ? (
      <div>
        <Grid stackable container verticalAlign="bottom" textAlign='center' columns={3}>
          <Grid.Row>
            <Image src={event.eventProfileImage} fluid/>
            <Grid.Column>
              <Header as='h2' inverted block>
                {event.eventName}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted block>
                    Opportunity Date: {event.eventDate} from {event.eventStartTime} through {event.eventEndTime}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted block>
                {orgProfile.email}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container>
          <Divider/>
          <Header as='h1' textAlign='center'>General Information</Header>

          <Grid stackable columns={2}>
            <Grid.Row centered>
              <Button onClick={getDirections}>Get directions</Button>
              <Button>Send an email</Button>
              <Button onClick={handleOpen}>Direct Message</Button>
            </Grid.Row>

            <Grid.Column>
              <Segment>
                <Header as="h3">
                  <Icon name="location arrow"/> Location
                </Header>
                <Image src={event.eventProfileImage}/>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="write"/> Description
                </Header>
                <p>
                  {event.eventDescription}
                </p>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="grid layout"/> Other Details
                </Header>
                <Icon name='user circle'/> Family-Friendly, Adults <br/>
                <Icon name='user plus'/> Mixed
              </Segment>
              <Segment>
                <Header as="">
                  <Icon name="calendar"/> Upcoming Dates
                </Header>
                {event.eventDate}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h3">
                  <Icon name="building"/> Organization
                </Header>
                {event.orgName}
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="address card"/> Contact Details
                </Header>
                {orgProfile.firstName} {orgProfile.lastName}<br/>
                {orgProfile.email} <br/>

              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="globe"/> Gallery
                </Header>
                <Image src={event.eventProfileImage}/>
              </Segment>
              <Segment>
                {/* eslint-disable-next-line react/prop-types */}
                {skills.map((skill, index) => (
                  <Label color='purple' key={`event-skill-${index}`}>
                    {skill.name}
                  </Label>))}
                {/* eslint-disable-next-line react/prop-types */}
                {environments.map((environment, index) => (
                  <Label color='blue' key={`event-environment-${index}`}>
                    {environment.name}
                  </Label>))}
                {/* eslint-disable-next-line react/prop-types */}
                {interests.map((interest, index) => (
                  <Label color='green' key={`event-interest-${index}`}>
                    {interest.name}
                  </Label>))}
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="group"/> RSVP
                </Header>

              </Segment>
            </Grid.Column>
          </Grid>

          {openSendMail ?
            <div>
              <div style={popupStyle}/>
              <Segment style={innerStyle}>
                <Button icon={'close'} floated={'right'} circular onClick={handleClose}/>
                <Header as={'h1'} textAlign={'center'} content={'SEND MESSAGE'}/>
                <Divider/>
                <Form onSubmit={handleSendSubmit}>
                  <Header content={`To: ${orgProfile.email}`}/>
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

        </Container>
      </div>
    ) : <Loader active>Getting data</Loader>)
  );
};

// Require an Event object in the props.
EventProfile.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventDescription: PropTypes.string,
    eventProfileImage: PropTypes.string,
    eventStartTime: PropTypes.string,
    eventEndTime: PropTypes.string,
    eventAddress: PropTypes.string,
    eventZip: PropTypes.string,
    eventCity: PropTypes.string,
    eventState: PropTypes.string,
    categories: PropTypes.string,
    orgName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  volunteer: PropTypes.shape({
    _id: PropTypes.string,
  }),
  orgProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  skills: PropTypes.array,
  interests: PropTypes.array,
  environments: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // Get the eventID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const eventID = _id;
  const subscription1 = Events.subscribe();
  const subscription2 = EventInterest.subscribe();
  const subscription3 = EventSkill.subscribe();
  const subscription4 = EventEnvironmental.subscribe();
  const subscription5 = SpecialSkills.subscribe();
  const subscription6 = Interests.subscribe();
  const subscription7 = Environmental.subscribe();
  const subscription8 = OrganizationProfiles.subscribe();
  const subscription9 = OrganizationEvent.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() &&
    subscription5.ready() && subscription6.ready() && subscription7.ready() && subscription8.ready() && subscription9.ready();
  const event = Events.find({ _id: eventID }).fetch()[0];
  console.log(event);
  console.log(event.owner);
  const orgProfile = OrganizationProfiles.findOne({ email: event.owner }, {});
  const skillPairs = EventSkill.find({ eventID: eventID }, {}).fetch();
  const skills = skillPairs.map((pair) => SpecialSkills.findOne({ _id: pair.skillID }, {}));
  const interestPairs = EventInterest.find({ eventID: eventID }, {}).fetch();
  console.log(interestPairs);
  const interests = interestPairs.map((pair) => Interests.findOne({ _id: pair.interestID }, {}));
  const environmentPairs = EventEnvironmental.find({ eventID: eventID }, {}).fetch();
  const environments = environmentPairs.map((pair) => Environmental.findOne({ _id: pair.environmentalID }, {}));
  console.log(orgProfile);
  console.log(event);
  return {
    event,
    skills,
    interests,
    environments,
    orgProfile,
    currentUser,
    ready,
  };
})(EventProfile);
