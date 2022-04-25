import React, { useEffect, useState } from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { Events } from '../../api/event/EventCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import EventCard from '../components/EventCard';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterEvents = ({ ready }) => {

  const allInterests = _.pluck(Interests.find({}, {}).fetch(), 'name');
  //pull each interest from the collection to populate form
  const formSchema = makeSchema(allInterests);
  //make the schema into an array
  const bridge = new SimpleSchema2Bridge(formSchema);
  //bridge for the form options
  //need build an array using state to collect selected interest to find associated events
  const eventInterests = EventInterest.find({ category: { $in: this.state.interests } }, {}).fetch();
  //find the events with the similar interest
  const eventIDList = eventInterests.map(eventInterest => eventInterest.eventID);
  //get the list of event id's
  console.log(eventInterests);

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container id="filter-page">
      <AutoForm schema={bridge} onSubmit={data => submit(data)} >
        <Segment>
          <MultiSelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests'}/>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
      </Card.Group>
    </Container>
  );
};

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
  return {
    ready,
  };
})(FilterEvents);
