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
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

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

  const convertTime = (time) => {
    const splitArray = time.split(':');
    if (splitArray[0] > 12) {
      splitArray[0] -= 12;
      splitArray[3] = ' PM';
    } else {
      splitArray[3] = ' AM';
    }
    splitArray[2] = splitArray[1];
    splitArray[1] = ':';
    return splitArray[0] + splitArray[1] + splitArray[2] + splitArray[3];
  };

  const convertDate = (date) => {
    let returnValue;
    let setter = false;
    const splitArray = date.split('-');
    if (splitArray[0] > 0) {
      setter = true;
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      const temp = splitArray[2];
      splitArray[2] = splitArray[0];
      splitArray[0] = months[splitArray[1] - 1];
      splitArray[1] = temp;
    }
    // eslint-disable-next-line no-unused-expressions
    (setter) ? returnValue = `${splitArray[0]} ${splitArray[1]}, ${splitArray[2]}` : returnValue = date;
    return returnValue;
  };

  return (
    <Card id={COMPONENT_IDS.EVENT_CARD} as={NavLink} exact to={`/details/${event._id}`}>
      <Image src='images/event_card_default_image.png' wrapped ui={false}/>
      <Card.Content>
        <Card.Header> {event.eventName}</Card.Header>
        <Card.Meta>
          <span>Date: {convertDate(event.eventDate)}</span>
          <br/>
          <span>Time: {convertTime(event.eventStartTime)} - {convertTime(event.eventEndTime)}</span>
          <br/>
          <span>Location: {event.eventAddress} {event.eventCity}, {event.eventState} {event.eventZip}</span>
          <br/>
        </Card.Meta>
        <Card.Description>
          <p>{event.eventDescription}</p>
        </Card.Description>
      </Card.Content>
      {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
        <Card.Content>
          <Button onClick={handleClick} color='green'>
            Add Event!
          </Button>
        </Card.Content>) : ''}
      {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
        <Card.Content>
          <TwitterShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <PinterestShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <EmailShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Card.Content>) : ''}
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
