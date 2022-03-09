import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image, Loader, Label, Segment, Divider, Icon, Card, Button, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { Events } from '../../api/event/EventCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { VolunteerInterest } from '../../api/interest/VolunteerInterestCollection';
import { Availabilities } from '../../api/availability/AvailabilityCollection';
import { VolunteerAvailability } from '../../api/availability/VolunteerAvailabilityCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { VolunteerSkill } from '../../api/special_skills/VolunteerSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { VolunteerEnvironmental } from '../../api/environmental_preference/VolunteerEnvironmentalCollection';
import { Hours } from '../../api/hours/HoursCollection';
import { VolunteerEventHours } from '../../api/hours/VolunteerEventHours';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const interestsStyle = {
  marginTop: '8px',
};
const segmentHeaderStyle = {
  paddingTop: '6px',
};

/** Renders the Page for adding a document. */
const VolunteerProfile = ({ volunteer, event, interests, skills, envPrefer, availabilities, totalHours, volEventsCount, orgEventsCount, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.VOLUNTEER_PROFILE} container centered>
    <Grid.Row>
      <Image src='/images/volunteer_profile_banner.png' size='big' />
    </Grid.Row>
    <Grid.Row >
      <Button as={NavLink} exact to={`/edit-volunteer-profile/${volunteer._id}`}>Edit Profile</Button>
      <Button>Settings</Button>
      <Button>Preferences</Button>
      <Button>Log Volunteer Hours</Button>
      <Button>Send an email</Button>
    </Grid.Row>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Label color='teal' size='massive' ribbon>
          {`${(capitalizeFirstLetter(volunteer.firstName))} ${(capitalizeFirstLetter(volunteer.lastName))}`}
        </Label>
        <Image src='images/profile.png' size='medium' circular centered />
        <Divider/>
        <Segment>
          <Header as="h3" style={segmentHeaderStyle}>
            <Icon name="tag"/>
            <Header.Content>Interests</Header.Content>
          </Header>
          {interests.map((interest, index) => (
            <Label style={interestsStyle} key={`vol-profile-interest-${index}`}>
              {interest.name}
            </Label>))}
        </Segment>
        <Segment>
          <Header as="h3" style={segmentHeaderStyle}>
            <Icon name="star"/>
            <Header.Content>Special Skills</Header.Content>
          </Header>
          {skills.map((skill, index) => (
            <Label style={interestsStyle} key={`vol-profile-skill-${index}`}>
              {skill.name}
            </Label>))}
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Statistic.Group horizontal size={ 'tiny' }>
            <Statistic>
              <Icon name="clock" size='big'/>
              <Statistic.Value>{totalHours.total}</Statistic.Value>
              <Statistic.Label>Total Hours Volunteered</Statistic.Label>
            </Statistic>
            <Statistic>
              <Icon name="building" size='big'/>
              <Statistic.Value>{orgEventsCount}</Statistic.Value>
              <Statistic.Label>Organizations Helped</Statistic.Label>
            </Statistic>
            <Statistic>
              <Icon name="globe" size='big'/>
              <Statistic.Value size='tiny'>{volEventsCount}</Statistic.Value>
              <Statistic.Label>Events Participated</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Segment>
          <Header as="h3">
            <Icon name="calendar outline"/> Upcoming Events
          </Header>
          <Card as={NavLink} exact to={`/details/${event._id}`}>
            <Image src='images/event_card_image_volunteer.jpg' size='medium'/>
            <Card.Content>
              <Card.Header> Mowing Peoples Lawns</Card.Header>
              <Card.Meta>
                <span>Date: 8:00am - 8:00pm</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Segment>
        <Segment>
          <Header as="h3" style={segmentHeaderStyle}>
            <Icon name="street view"/>
            <Header.Content>Environmental Preference</Header.Content>
          </Header>
          <Label>{envPrefer.name}</Label>
          <Header as="h3" style={segmentHeaderStyle}>
            <Icon name="calendar alternate outline"/>
            <Header.Content>Availabilities</Header.Content>
          </Header>
          {availabilities.map((availability, index) => (
            <Label style={interestsStyle} key={`vol-profile-availability-${index}`}>
              {availability.name}
            </Label>))}
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Divider/>
    <Grid.Row>
    </Grid.Row>
  </Grid>
) : <Loader active>Getting data</Loader>);

VolunteerProfile.propTypes = {
  volunteer: PropTypes.object,
  event: PropTypes.object,
  interests: PropTypes.array,
  skills: PropTypes.array,
  envPrefer: PropTypes.object,
  availabilities: PropTypes.array,
  totalHours: PropTypes.object,
  volEventsCount: PropTypes.number,
  orgEventsCount: PropTypes.number,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // volunteers.map((volunteer) => <VolunteerCard key={volunteer._id} volunteer={volunteer}
  // Get access to volunteer documents.
  const subscription = VolunteerProfiles.subscribeCurrVolProfile();
  const subscription2 = Events.subscribe();
  const subscription3 = Interests.subscribe();
  const subscription4 = VolunteerInterest.subscribeCurr();
  const subscription5 = SpecialSkills.subscribe();
  const subscription6 = VolunteerSkill.subscribeCurr();
  const subscription7 = Environmental.subscribe();
  const subscription8 = VolunteerEnvironmental.subscribeCurr();
  const subscription9 = Availabilities.subscribe();
  const subscription10 = VolunteerAvailability.subscribeCurr();
  const subscription11 = Hours.subscribe();
  const subscription12 = VolunteerEventHours.subscribe();
  const subscription13 = VolunteerEvent.subscribe();
  const subscription14 = OrganizationEvent.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
      && subscription5.ready() && subscription6.ready() && subscription7.ready() && subscription8.ready() && subscription9.ready()
      && subscription10.ready() && subscription11.ready() && subscription12.ready() && subscription13.ready() && subscription14.ready();
  // Get the volunteer documents and sort them by name.
  const event = Events.find({}, { sort: { name: 1 } }).fetch()[0];
  // const volunteerProfile = VolunteerProfiles.findOne({ userID: Meteor.userId() }, {});
  // Get volunteer profile
  const volunteer = VolunteerProfiles.findOne({}, {});

  // Get volunteer interests
  const volInterests = VolunteerInterest.find({}, {}).fetch();
  const interests = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volInterests !== 'undefined' && ready) ? (
    volInterests.map((volInterest) => interests.push(Interests.findDoc({ _id: volInterest.interestID })))) : '';

  // get volunteer special skills
  const volSkills = VolunteerSkill.find({}, {}).fetch();
  const skills = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volSkills !== 'undefined' && ready) ? (
    volSkills.map((volSkill) => skills.push(SpecialSkills.findDoc({ _id: volSkill.skillID })))) : '';

  // get volunteer environmental prefer
  const volEnvPrefers = VolunteerEnvironmental.find({}, {}).fetch()[0];
  const envPrefer = (typeof volEnvPrefers !== 'undefined' && ready) ? (Environmental.findDoc({ _id: volEnvPrefers.environmentalID })) : {};

  // get volunteer availability
  const volAvailabilities = VolunteerAvailability.find({}, {}).fetch();
  const availabilities = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volAvailabilities !== 'undefined' && ready) ? (
    volAvailabilities.map((volAvailability) => availabilities.push(Availabilities.findDoc({ _id: volAvailability.availabilityID })))) : '';

  // get total hours helped at events
  const volTotalEventHours = VolunteerEventHours.findOne({ volunteerID: Meteor.userId() }, {});
  const totalHours = (typeof volTotalEventHours !== 'undefined' && ready) ? (Hours.findDoc({ _id: volTotalEventHours.hoursID })) : {};

  // get volunteer helped event count
  const volEventsCount = VolunteerEvent.find({ volunteerID: Meteor.userId() }, {}).count();

  // get OrgEvents
  const volEvents = VolunteerEvent.find({ volunteerID: Meteor.userId() }, {}).fetch();
  const orgEvents = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volEvents !== 'undefined' && ready) ? (
    volEvents.map((volEvent) => orgEvents.push(OrganizationEvent.findDoc({ eventID: volEvent.eventID })))) : '';
  const orgEventsCount = orgEvents.length;

  return {
    volunteer,
    event,
    ready,
    interests,
    skills,
    envPrefer,
    availabilities,
    totalHours,
    volEventsCount,
    orgEventsCount,
  };
})(VolunteerProfile);
