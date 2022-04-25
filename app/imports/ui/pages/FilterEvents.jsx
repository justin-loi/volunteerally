import React, { useEffect, useState } from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { Events } from '../../api/event/EventCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import EventCard from '../components/EventCard';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allEvents) => new SimpleSchema({
  events: { type: Array, label: 'Events', optional: true },
  'events.$': { type: String, allowedValues: allEvents },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterEvents = ({ ready, events, interests, eventInterests }) => {
  const [eventsArray, setEventsArray] = useState([]);
  const [bridge, setBridge] = useState();
  useEffect(() => {
    setEventsArray(events);
    const formSchema = makeSchema(interests.map(interest => interest._id));
    // console.log(interests.map(interest => interest._id));
    const tempBridge = new SimpleSchema2Bridge(formSchema);
    setBridge(tempBridge);
  }, [events, interests]);

  const submit = (data) => {
    // this.setState({ events: data.events || [] });
    console.log(data);
  };
  // const eventsByInterest = _.pluck(EventInterest.find({}, {}).fetch(), '_id');
  // console.log(eventsByInterest);
  // const eventIDArray = eventsByInterest.map(eventByInterest => eventByInterest.eventID);
  // console.log(eventIDArray);
  // const events = eventIDArray.map(eventID => _.unique(Events.findOne({ eventID: eventID }, {})));
  // console.log(events);
  // const formSchema = makeSchema(events);
  // const bridge = new SimpleSchema2Bridge(formSchema);

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container id="filter-page">
      <AutoForm schema={bridge} onSubmit={data => submit(data)} >
        <Segment>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
        {eventsArray.map((event, index) => (<EventCard key={index} event={event}/>))}
      </Card.Group>
    </Container>
  );
};

/** Require an array of Stuff documents in the props. */
FilterEvents.propTypes = {
  ready: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  eventInterests: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const subscription2 = Interests.subscribe();
  const subscription3 = EventInterest.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  const events = Events.find({}, { sort: { name: 1 } }).fetch();
  const interests = Interests.find({}, {}).fetch();
  const eventInterests = EventInterest.find({}, {}).fetch();
  return {
    events,
    interests,
    eventInterests,
    ready,
  };
})(FilterEvents);
