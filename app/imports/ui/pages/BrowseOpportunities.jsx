import React, { useState } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
// import { PAGE_IDS } from '../utilities/PageIDs';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';

/* Renders a list of events. Use <EventCard> to render each event card. */
const BrowseOpportunities = ({ /* ready, */ events }) => {
  const [results, setResult] = useState(events);
  const [value, setValue] = useState('');

  const resultRenderer = (event) => <EventCard event={event}/>;

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
    <Search id='searchbar' placeholder='Search for any position, location, or skill!'
      onResultSelect={onResultSelect}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  );
};

// Require an array of BrowseOpportunities documents in the props.
BrowseOpportunities.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Events.subscribe();
  const ready = subscription.ready();
  const events = Events.find({}, { sort: { name: 1 } }).fetch();
  return {
    events,
    ready,
  };
})(BrowseOpportunities);
