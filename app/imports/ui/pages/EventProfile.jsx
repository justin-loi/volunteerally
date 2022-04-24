import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Header, Loader, Grid, Icon, Segment, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
// import { ROLE } from '../../api/role/Role';

// Renders a Event Info page that connects with the current Event collection.
const gridStyle = { height: '500px', fontSize: '75px' };

const EventProfile = ({ event, orgProfile, skills, environments, interests, ready }) => ((ready) ? (
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
    </Container>
  </div>
) : <Loader active>Getting data</Loader>);

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
