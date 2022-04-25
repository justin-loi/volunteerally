import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, PinterestShareButton, PinterestIcon, EmailShareButton, EmailIcon } from 'react-share';
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

const shareUrl = 'http://165.22.207.71/#/browse_opportunities';
const title = 'VolunteerAlly';

/* Renders a single event card. */
const EventCard = ({ event }) => {
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
      <Image src='images/event_card_default_image.png' wrapped ui={false}/>
      <Card.Content>
        <Card.Header> {event.eventName}</Card.Header>
        <Card.Meta>
          <span>Date: {event.eventDate}</span>
          <br/>
          <span>Time: {event.eventStartTime} - {event.eventEndTime}</span>
          <br/>
          <span>Location: {event.eventAddress} {event.eventCity}, {event.eventState} {event.eventZip}</span>
          <br/>
        </Card.Meta>
        <Card.Description>
          <p>{event.eventDescription}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Button onClick={handleClick} color='green'>
            Add Event!
          </Button>) : ''}
      </Card.Content>
      <Card.Content>
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <TwitterShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <PinterestShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <EmailShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>) : ''}
      </Card.Content>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventStartTime: PropTypes.string,
    eventDescription: PropTypes.string,
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
};

const EventCardCon = withTracker((eventID) => {
  // console.log('Eventcard', eventID);
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
  return {
    event,
    ready,
  };
})(EventCard);

export default EventCardCon;
