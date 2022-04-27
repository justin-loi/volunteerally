import React, { useState } from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, SubmitField, SelectField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import { Events } from '../../../api/event/EventCollection';
import EventCard from '../EventCard';
import { Environmental } from '../../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { EventEnvironmental } from '../../../api/environmental_preference/EventEnvironmentalCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeEnvironmentsSchema = (allEnvironments) => new SimpleSchema({
  environments: { type: Array, label: 'Environments', optional: true },
  'environments.$': { type: String, allowedValues: allEnvironments },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterEnvironments = ({ ready }) => {
  const [environments, setEnvironments] = useState([]);
  const allEnvironments = _.pluck(Environmental.find({}, {}).fetch(), 'name');
  console.log(allEnvironments);
  const environmentFormSchema = makeEnvironmentsSchema(allEnvironments);
  const environmentBridge = new SimpleSchema2Bridge(environmentFormSchema);
  const environmentIDs = environments.map(name => Environmental.findDoc(name)._id);
  const eventEnvironments = EventEnvironmental.find({ environmentalID: { $in: environmentIDs } }, {}).fetch();
  const eventIDList = _.uniq(eventEnvironments.map(eventEnvironment => eventEnvironment.eventID));
  const eventsByEnvironment = eventIDList.map(id => Events.findDoc(id));
  const submitEnvironments = (data) => {
    setEnvironments(data.environments);
  };

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container>
      <AutoForm schema={environmentBridge} onSubmit={data => submitEnvironments(data)} >
        <Segment>
          <SelectField id='environments' name='environments' showInlineError={true} placeholder={'Environments'} multiple checkboxes/>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
        {_.map(eventsByEnvironment, (event, index) => <EventCard key={index} event={event}/>)}
      </Card.Group>
    </Container>
  );
};

/** Require an array of Stuff documents in the props. */
FilterEnvironments.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const subscription2 = Environmental.subscribe();
  const subscription3 = EventEnvironmental.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  return {
    ready,
  };
})(FilterEnvironments);
