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
import { OrganizationProfiles } from '../../../api/organization/OrganizationProfileCollection';
import { OrganizationEvent } from '../../../api/event/OrganizationEventCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeOrganizationSchema = (allOrganizations) => new SimpleSchema({
  organizations: { type: Array, label: 'Organizations', optional: true },
  'organizations.$': { type: String, allowedValues: allOrganizations },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterOrganizations = ({ ready }) => {
  const [organizations, setOrganizations] = useState([]);
  const allOrganizations = _.pluck(OrganizationProfiles.find({}, {}).fetch(), 'name');
  const organizationFormSchema = makeOrganizationSchema(allOrganizations);
  const organizationBridge = new SimpleSchema2Bridge(organizationFormSchema);
  const organizationIDs = organizations.map(name => OrganizationProfiles.findDoc(name)._id);
  const eventOrganizations = OrganizationEvent.find({ organizationID: { $in: organizationIDs } }, {}).fetch();
  const eventIDList = _.uniq(eventOrganizations.map(eventOrganization => eventOrganization.eventID));
  const eventsByOrganization = eventIDList.map(id => Events.findDoc(id));
  const submitOrganizations = (data) => {
    setOrganizations(data.organizations);
  };

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container>
      <AutoForm schema={organizationBridge} onSubmit={data => submitOrganizations(data)} >
        <Segment>
          <SelectField id='organizations' name='organizations' showInlineError={true} placeholder={'Organizations'} multiple checkboxes/>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
        {_.map(eventsByOrganization, (event, index) => <EventCard key={index} event={event}/>)}
      </Card.Group>
    </Container>
  );
};

/** Require an array of Stuff documents in the props. */
FilterOrganizations.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const subscription2 = OrganizationProfiles.subscribe();
  const subscription3 = OrganizationEvent.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  return {
    ready,
  };
})(FilterOrganizations);
