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
import { SpecialSkills } from '../../../api/special_skills/SpecialSkillCollection';
import { EventSkill } from '../../../api/special_skills/EventSkillCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSkillSchema = (allSkills) => new SimpleSchema({
  skills: { type: Array, label: 'Skills', optional: true },
  'skills.$': { type: String, allowedValues: allSkills },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterSkills = ({ ready }) => {
  const [skills, setSkills] = useState([]);
  const allSkills = _.pluck(SpecialSkills.find({}, {}).fetch(), 'name');
  const skillsFormSchema = makeSkillSchema(allSkills);
  const skillBridge = new SimpleSchema2Bridge(skillsFormSchema);
  const skillIDs = skills.map(name => SpecialSkills.findDoc(name)._id);
  const eventSkills = EventSkill.find({ skillID: { $in: skillIDs } }, {}).fetch();
  const eventIDList = _.uniq(eventSkills.map(eventSkill => eventSkill.eventID));
  const eventsBySkill = eventIDList.map(id => Events.findDoc(id));
  const submitSkills = (data) => {
    setSkills(data.skills);
  };

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container>
      <AutoForm schema={skillBridge} onSubmit={data => submitSkills(data)} >
        <Segment>
          <SelectField id='skills' name='skills' showInlineError={true} placeholder={'Skills'} multiple checkboxes/>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
        {_.map(eventsBySkill, (event, index) => <EventCard key={index} event={event}/>)}
      </Card.Group>
    </Container>
  );
};

/** Require an array of Stuff documents in the props. */
FilterSkills.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const subscription2 = SpecialSkills.subscribe();
  const subscription3 = EventSkill.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  return {
    ready,
  };
})(FilterSkills);
