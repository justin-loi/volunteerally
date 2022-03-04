import React from 'react';
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

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const interestsStyle = {
  marginTop: '8px',
};

/** Renders the Page for adding a document. */
const VolunteerProfile = ({ volunteer, event, interests, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.VOLUNTEER_PROFILE} container centered>
    <Grid.Row>
      <Image src='/images/volunteer_profile_banner.png' size='big' />
    </Grid.Row>
    <Grid.Row >
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
          <Header as="h3">
            <Icon name="tag"/> Interests
          </Header>
          <Label>
            <Icon name='leaf' size='big' /> Environment
          </Label>
          <Label>
            <Icon name='paw' size='big'/> Animal Welfare/Rescue
          </Label>
          <Label>
            <Icon name='graduation cap' size='big'/> Education
          </Label>
          {interests.map((interest, index) => (
            <Label style={interestsStyle} key={`vol-profile-interest-${index}`}>
              {interest.name}
            </Label>))}
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>22</Statistic.Value>
              <Icon name="clock" size='big'/>
              <Statistic.Label>Total Hours Volunteered</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>2</Statistic.Value>
              <Icon name="building" size='big'/>
              <Statistic.Label>Organizations Helped</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>5</Statistic.Value>
              <Icon name="globe" size='big'/>
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
  envPerfer: PropTypes.object,
  availabilities: PropTypes.array,
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
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
      && subscription5.ready() && subscription6.ready() && subscription7.ready() && subscription8.ready() && subscription9.ready()
      && subscription10.ready();
  // Get the volunteer documents and sort them by name.
  const event = Events.find({}, { sort: { name: 1 } }).fetch()[0];
  const volunteer = VolunteerProfiles.findOne({}, {});
  const volInterests = VolunteerInterest.find({}, {}).fetch();
  const interests = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volInterests !== 'undefined' && ready) ? (
    volInterests.map((volInterest) => interests.push(Interests.findDoc({ _id: volInterest.interestID })))) : '';
  const volSkills = VolunteerSkill.find({}, {}).fetch();
  const skills = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volSkills !== 'undefined' && ready) ? (
    volSkills.map((volSkill) => skills.push(SpecialSkills.findDoc({ _id: volSkill.skillID })))) : '';
  const volEnvPrefers = VolunteerEnvironmental.find({}, {}).fetch()[0];
  const envPerfer = (typeof volEnvPrefers !== 'undefined' && ready) ? (Environmental.findDoc({ _id: volEnvPrefers.environmentalID })) : {};
  const volAvailabilities = VolunteerAvailability.find({}, {}).fetch();
  const availabilities = [];
  // eslint-disable-next-line no-unused-expressions
  (typeof volAvailabilities !== 'undefined' && ready) ? (
    volAvailabilities.map((volAvailability) => availabilities.push(Availabilities.findDoc({ _id: volAvailability.availabilityID })))) : '';
  return {
    volunteer,
    event,
    ready,
    interests,
    skills,
    envPerfer,
    availabilities,
  };
})(VolunteerProfile);
