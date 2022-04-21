import React, { useState } from 'react';
<<<<<<< Updated upstream
import { Meteor } from 'meteor/meteor';
import { Form, Container, Button, Header, Loader, Grid, Icon, Segment, Image, Divider } from 'semantic-ui-react';
=======
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Form, Divider, Grid, Icon, Segment, Image, Label } from 'semantic-ui-react';
>>>>>>> Stashed changes
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
<<<<<<< Updated upstream
import { createNewMessageMethod } from '../../api/message/MessageCollection.methods';

// Renders a Event Info page that connects with the current Event collection.

/* const EventProfile = ({ event, orgProfile, currentUser, ready, variable }) => ((ready) ? (
  <div>
    <div className="event-profile-top-background">
      <Grid stackable container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' inverted block>
              {event.eventName}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted block>
              Opportunity Date: {event.date} {event.time}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' inverted block>
              {orgProfile.email}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    <Container>
      <Header as='h1' textAlign='center'>General Information</Header>

      <Grid stackable columns={2}>
        <Grid.Row centered>
          <Button>Get directions</Button>
          <Button>Bookmark</Button>
          <Button>Share</Button>
          <Button>Send an email</Button>
          <Button>Direct Message</Button>
          <Button>Report</Button>
        </Grid.Row>

        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="location arrow"/> Location
            </Header>
            <Image src="images/red-cross-map.jpeg"/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="write"/> Description
            </Header>
            <p>
              This event requires orientation and training, please revert to website for additional information.*
              Disaster Action Team volunteers help local families cope with emergencies. Home fires and other
              disasters can occur at any time, any place. As a Disaster Action Team volunteer, you&apos;ll provide
              emotional support, financial assistance, and information to help families begin the process of
              recovery. After your initial training, your shifts will include responding to emergencies within 2
              hours, night or day, rain or shine, either on the scene or coordinating remotely to provide immediate
              compassion and care. Location will vary base on the situation.
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
            {event.date} {event.time}
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
            808 - 734 - 2101 <br/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Gallery
            </Header>
            <Image src="images/red-cross-gallery.jpeg"/>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="sort"/> Categories
            </Header>
            {event.categories}
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="group"/> RSVP
            </Header>
            {currentUser ?
              'Form is currently under construction' : ('Please log in or register to RSVP.')}
          </Segment>
        </Grid.Column>
      </Grid>
      {variable ? "Hi": "Bye"}
    </Container>
  </div>
) : <Loader active>Getting data</Loader>);
*/

const EventProfile = ({ event, orgProfile, currentUser, ready }) => {
=======
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
>>>>>>> Stashed changes

  const gridStyle = { height: '500px', fontSize: '75px' };
  const [openSendMail, setOpenSendMail] = useState(false);
  const [cSubject, setSubject] = useState('');
  const [cContent, setContent] = useState('');

  const handleOpen = () => {
    setOpenSendMail(true);
  };
<<<<<<< Updated upstream
=======

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
    // width: '504px',
    width: '50%',
    left: '25%',
    top: '25%',
    margin: 'auto',
  };

  return (
    ((ready) ? (
      <div>
        <Image src={event.eventProfileImage} size="massive"/>
        <Grid stackable container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
          <Grid.Row>
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
          <Header as='h1' textAlign='center'>General Information</Header>

          <Grid stackable columns={2}>
            <Grid.Row centered>
              <Button>Get directions</Button>
              <Button>Send an email</Button>
              <Button onClick={handleOpen}>Direct Message</Button>
              <Button>Report</Button>
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
                  <Label key={`event-skill-${index}`}>
                    {skill.name}
                  </Label>))}
                {/* eslint-disable-next-line react/prop-types */}
                {environments.map((environment, index) => (
                  <Label key={`event-environment-${index}`}>
                    {environment.name}
                  </Label>))}
                {/* eslint-disable-next-line react/prop-types */}
                {interests.map((interest, index) => (
                  <Label key={`event-interest-${index}`}>
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
>>>>>>> Stashed changes

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
    // width: '504px',
    width: '50%',
    left: '25%',
    top: '25%',
    margin: 'auto',
  };

  return (
    ((ready) ? (
      <div>
        <div className="event-profile-top-background">
          <Grid stackable container verticalAlign="bottom" textAlign='center' style={gridStyle} columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Header as='h2' inverted block>
                  {event.eventName}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' inverted block>
                      Opportunity Date: {event.date} {event.time}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' inverted block>
                  {orgProfile.email}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Container>
          <Header as='h1' textAlign='center'>General Information</Header>

          <Grid stackable columns={2}>
            <Grid.Row centered>
              <Button>Get directions</Button>
              <Button>Bookmark</Button>
              <Button>Share</Button>
              <Button>Send an email</Button>
              <Button onClick={handleOpen}>Direct Message</Button>
              <Button>Report</Button>
            </Grid.Row>

            <Grid.Column>
              <Segment>
                <Header as="h3">
                  <Icon name="location arrow"/> Location
                </Header>
                <Image src="images/red-cross-map.jpeg"/>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="write"/> Description
                </Header>
                <p>
                      This event requires orientation and training, please revert to website for additional information.*
                      Disaster Action Team volunteers help local families cope with emergencies. Home fires and other
                      disasters can occur at any time, any place. As a Disaster Action Team volunteer, you&apos;ll provide
                      emotional support, financial assistance, and information to help families begin the process of
                      recovery. After your initial training, your shifts will include responding to emergencies within 2
                      hours, night or day, rain or shine, either on the scene or coordinating remotely to provide immediate
                      compassion and care. Location will vary base on the situation.
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
                {event.date} {event.time}
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
                    808 - 734 - 2101 <br/>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="globe"/> Gallery
                </Header>
                <Image src="images/red-cross-gallery.jpeg"/>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="sort"/> Categories
                </Header>
                {event.categories}
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="group"/> RSVP
                </Header>
                {currentUser ?
                  'Form is currently under construction' : ('Please log in or register to RSVP.')}
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
<<<<<<< Updated upstream
  event: PropTypes.object,
  orgProfile: PropTypes.object,
=======
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
  currentUser: PropTypes.bool.isRequired,
>>>>>>> Stashed changes
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // Get the eventID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const eventId = _id;
  // Get access to Events documents.
  const subscription1 = Events.subscribe();
<<<<<<< Updated upstream
  const subscription2 = OrganizationProfiles.subscribe();
  const sub = Messages.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && sub.ready();
  const event = Events.find({ _id: eventId }).fetch()[0];
  let orgProfile;
  if (event !== undefined) {
    orgProfile = OrganizationProfiles.findByEmail(event.owner);
    // console.log(orgProfile);
    // console.log(event);
  }

=======
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
  const orgProfile = OrganizationProfiles.findOne({ email: event.owner }, {});
  const skillPairs = EventSkill.find({ eventID: eventID }, {}).fetch();
  const skills = skillPairs.map((pair) => SpecialSkills.findOne({ _id: pair.skillID }, {}));
  const interestPairs = EventInterest.find({ eventID: eventID }, {}).fetch();
  const interests = interestPairs.map((pair) => Interests.findOne({ _id: pair.interestID }, {}));
  const environmentPairs = EventEnvironmental.find({ eventID: eventID }, {}).fetch();
  const environments = environmentPairs.map((pair) => Environmental.findOne({ _id: pair.environmentalID }, {}));
>>>>>>> Stashed changes
  return {
    event,
    currentUser,
    orgProfile,
    ready,
  };

})(EventProfile);
