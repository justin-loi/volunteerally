import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
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
class FilterEvents extends React.Component {

  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  submit(data) {
    this.setState({ events: data.events || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const eventsByInterest = _.pluck(EventInterest.find({}, {}).fetch(), '_id');
    //console.log(eventsByInterest);
    const eventIDArray = eventsByInterest.map(eventByInterest => eventByInterest.eventID);
    console.log(eventIDArray);
    const events = eventIDArray.map(eventID => _.unique(Events.findOne({ eventID: eventID }, {})));
    //console.log(events);
    const formSchema = makeSchema(events);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests Name'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(events, (event, index) => <EventCard key={index} profile={event}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FilterEvents.propTypes = {
  ready: PropTypes.bool.isRequired,
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
