import React from 'react';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { ROLE } from '../../api/role/Role';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';
import { Events } from '../../api/event/EventCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';


const interestsStyle = {
  marginTop: '8px',
};

/* Renders a single event card. */
const EventCard = ({ event, environments, skills, interests, ready }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const vID = Meteor.userId();
    const definitionData = { volunteerID: vID, eventID: event._id };
    if (vID) {
      defineMethod.callPromise({ collectionName: VolunteerEvent.getCollectionName(), definitionData })
        .catch(error => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          swal({
            title: 'Add Opportunity',
            text: 'Opportunity added successfully',
            icon: 'success',
            timer: 1500,
          });
        });

    }
  };

  return (
    <Card as={NavLink} exact to={`/details/${event._id}`}>
      <Image src= {event.eventCardImage} wrapped ui={false}/>
      <Card.Content>
        <Card.Header> {event.eventName}</Card.Header>
        <Card.Meta>
          <span>Date: {event.eventDate}</span>
          <br/>
          <span>Time: {event.eventTime}</span>
          <br/>
          <span>Location: {event.eventAddress} {event.eventCity}, {event.eventState} {event.eventZip}</span>
          <br/>
        </Card.Meta>
        <Card.Description>
          {/* eslint-disable-next-line react/prop-types */}
          {skills.map((skill, index) => (
            <Label style={interestsStyle} key={`event-skill-${index}`}>
              {skill.name}
            </Label>))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          {event.categories}
        </p>
      </Card.Content>
      <Card.Content>
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Button onClick={handleClick} color='green'>
            Add Event!
          </Button>) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='twitter' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='facebook' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='mail' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='pinterest' />) : ''}

      </Card.Content>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventTime: PropTypes.string,
    eventAddress: PropTypes.string,
    eventZip: PropTypes.string,
    eventCity: PropTypes.string,
    eventCardImage: PropTypes.string,
    eventState: PropTypes.string,
    categories: PropTypes.string,
    orgName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  volunteer: PropTypes.shape({
    _id: PropTypes.string,
  }),
  skill: PropTypes.shape({
    _id: PropTypes.array,
  }),
  interest: PropTypes.shape({
    _id: PropTypes.array,
  }),
  environment: PropTypes.shape({
    _id: PropTypes.array,
  }),
};

const EventCardCon = withTracker((eventID) => {
  const subscription = Events.subscribe();
  const subscription2 = EventInterest.subscribe();
  const subscription3 = EventSkill.subscribe();
  const subscription4 = EventEnvironmental.subscribe();
  const subscription5 = SpecialSkills.subscribe();
  const subscription6 = Interests.subscribe();
  const subscription7 = Environmental.subscribe();
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() &&
  subscription5.ready() && subscription6.ready() && subscription7.ready();
  const event = eventID.event;
  const skillPairs = EventSkill.find({ eventID: event._id }, {}).fetch();
  const skills = skillPairs.map((pair) => SpecialSkills.findOne({ _id: pair.skillID }, {}));
  const interestPairs = EventInterest.find({ eventID: event._id }, {}).fetch();
  const interests = interestPairs.map((pair) => Interests.findOne({ _id: pair.interestID }, {}));
  const environmentPairs = EventEnvironmental.find({ eventID: event._id }, {}).fetch();
  const environments = environmentPairs.map((pair) => Environmental.findOne({ _id: pair.environmentalID }, {}));
  return {
    event,
    skills,
    interests,
    environments,
    ready,
  };
})(EventCard);

export default EventCardCon;
