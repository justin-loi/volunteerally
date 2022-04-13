import React, { useState } from 'react';
import _ from 'lodash';
import { Container, Search, Divider, Header, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';

// import { PAGE_IDS } from '../utilities/PageIDs';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';

/* Renders a list of events. Use <EventCard> to render each event card. */
const BrowseOpportunities = ({ events }) => {

  const [results, setResult] = useState(events);
  const [value, setValue] = useState('');

  const resultRenderer = (event) => <EventCard event={event} />;

  const handleSearchChange = (e, data) => {
    setValue(data.value);
    if (data.value.length === 0) {
      setResult([]);
      setValue('');
    }

    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = (result) => re.test(result.eventName) || re.test(result.orgName);
    setResult(_.filter(events, isMatch));
  };

  const onResultSelect = (e, data) => {
    setValue(data.result.eventName);
    const re = new RegExp(_.escapeRegExp(data.result.eventName), 'i');
    const isMatch = (result) => re.test(result.eventName);

    setResult(_.filter(events, isMatch));
  };

  return (
    <Container>
      <Header as="h2" textAlign="center">Browse Opportunities</Header>
      <Divider/>
      <Search style={{ marginBottom: 50 }} id='searchbar' placeholder='Search for any position, location, or skill!'
        onResultSelect={onResultSelect}
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
      />

      <Card.Group centered>
        {events.map((event) => <EventCard key={event._id} eventID={event._id} />)}
      </Card.Group>
    </Container>

  );
};

// Require an array of BrowseOpportunities documents in the props.
BrowseOpportunities.propTypes = {
  events: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  environments: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  volunteerInterests: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Events.subscribe();
  const ready = subscription.ready();
  const events = Events.find({}, { sort: { name: 1 } }).fetch();
  const interests = EventInterest.find({}, { sort: { name: 1 } }).fetch();
  const skills = EventSkill.find({}, { sort: { name: 1 } }).fetch();
  const environments = EventEnvironmental.find({}, { sort: { name: 1 } }).fetch();

  return {
    events,
    interests,
    skills,
    environments,
    ready,
  };
})(BrowseOpportunities);
