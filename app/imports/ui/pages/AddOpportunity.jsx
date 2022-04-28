import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Header, Segment, Form, Loader } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import Axios from 'axios';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { checkboxHelper } from '../components/VolunteerUsefulFunction';
import { addNewEventMethod } from '../../api/event/EventCollection.methods';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  eventDescription: String,
  eventProfileImage: { type: String, optional: true },
  eventAddress: String,
  eventCity: String,
  eventState: String,
  eventZip: String,
  eventStartTime: String,
  eventEndTime: String,
  orgName: String,
  eventDate: String,
  // owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Add Event, adds a new event.
 */
const AddEvent = ({ location, ready, interestsArray, skillsArray, environmentalArray, organization }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [interests, setInterests] = useState([]);
  const [specialSkills, setSpecialSkills] = useState([]);
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [eventProfileImage, setImage] = useState('');
  const [createdEventID, setCreatedEventID] = useState('');

  const uploadImg = (files) => {
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append('file', files[0]);
    data.append('cloud_name', 'irene-ma');
    data.append('upload_preset', 'nkv8kepo');
    Axios.post('https://api.cloudinary.com/v1_1/irene-ma/image/upload', data).then((r) => {
      console.log(r.data.url);
      setImage(r.data.url);
    });
  };
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'eventProfileImage':
      setImage(value);
      break;
    case 'interests':
      setInterests(checkboxHelper(interests, value));
      break;
    case 'specialSkills':
      setSpecialSkills(checkboxHelper(specialSkills, value));
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      break;
    default:
      // do nothing.
    }
  };
  /* Handle SignUp submission. Create the event and populate events, orgEvents collections. */
  const submit = (data, formRef) => {
    // eslint-disable-next-line no-param-reassign
    data.owner = organization.email;
    // eslint-disable-next-line no-param-reassign
    data.interests = interests;
    // eslint-disable-next-line no-param-reassign
    data.skills = specialSkills;
    // eslint-disable-next-line no-param-reassign
    data.environmental = environmentalPreference;
    // eslint-disable-next-line no-param-reassign
    data.eventProfileImage = eventProfileImage;
    // eslint-disable-next-line no-param-reassign
    addNewEventMethod.callPromise(data)
      .catch(error => {
        swal('Error', error.message, 'error');
      })
      .then((result) => {
        formRef.reset();
        setInterests([]);
        setSpecialSkills([]);
        setEnvironmentalPreference('');
        setImage('');
        swal({
          title: 'Opportunity Created!',
          text: 'This opportunity will now be visible.',
          icon: 'success',
          timer: 1500,
        });
        // console.log(result);
        setCreatedEventID(result);
        setRedirectToReferer(true);
      });
  };

  /* Display the event creation form. Redirect to the event profile page after successful registration and login. */
  const { from } = location.state || { from: { pathname: `/details/${createdEventID}` } };
  // if correct authentication, redirect to from: page instead of signup screen

  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_EVENT}>
      <Grid textAlign="center" verticalAlign="middle" centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Create A New Opportunity!
          </Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <TextField name='eventName' type='name' label='Event Name' placeholder='Beach Cleanup' iconLeft='certificate' id={COMPONENT_IDS.ADD_EVENT_NAME}/>
              <TextField name='orgName' type='name' label='Organization Name' placeholder='The Red Cross' iconLeft='lock' id={COMPONENT_IDS.ADD_EVENT_ORGANIZATION_NAME}/>
              <TextField name='eventDate' type='date' label='Opportunity Date' placeholder='04/22/2022' iconLeft='lock' id={COMPONENT_IDS.ADD_EVENT_DATE}/>
              <TextField name='eventStartTime' type='time' label='Opportunity Start Time' placeholder='8:00am' iconLeft='clock' id={COMPONENT_IDS.ADD_EVENT_START_TIME}/>
              <TextField name='eventEndTime' type='time' label='Opportunity End Time' placeholder='8:00pm' iconLeft='clock' id={COMPONENT_IDS.ADD_EVENT_END_TIME}/>
              <LongTextField name='eventDescription' type='description' placeholder='Looking for ocean loving volunteers to clean up...' icon='bullhorn' id={COMPONENT_IDS.ADD_EVENT_DESCRIPTION}/>
              <TextField name='eventAddress' placeholder='1234 Example Street' iconLeft='map marker alternate'
                id={COMPONENT_IDS.ADD_EVENT_ADDRESS} required/>
              <div className="two fields">
                <div className="field">
                  <TextField name='eventCity' placeholder='Honolulu' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_CITY} required/>
                </div>
                <div className="field">
                  <TextField name='eventState' placeholder='Hawaii' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_STATE} required/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <TextField name='eventZip' placeholder='96822' label='Zip/Postal Code' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_ZIPCODE} required/>
                </div>
              </div>
              <div className="field">
                <h4>Upload an Event Profile Banner Image</h4>
                <Form.Input name="eventProfileImage"
                  style={{ marginTop: '10px' }}
                  type='file' onChange={(event) => {
                    uploadImg(event.target.files);
                  }}
                />
              </div>
              <label style={{ paddingTop: '20px' }}>Special Interests for the Opportunity? </label>
              <Form.Group>
                <Grid columns={2} container>
                  <Grid.Row>
                    {interestsArray.map((interest, index) => (
                      <Grid.Column key={`add-event-interests-${index}`}>
                        <Form.Checkbox
                          key={`add-event-interests-${interest._id}`}
                          id={`add-event-interests-${index}`}
                          label={interest.name}
                          name='interests'
                          value={interest._id}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <label style={{ paddingTop: '20px' }}>Special Skills wanted for the opportunity? (optional) </label>
              <Form.Group>
                <Grid columns={2} container>
                  <Grid.Row>
                    {skillsArray.map((skill, index) => (
                      <Grid.Column key={`add-event-skills-${index}`}>
                        <Form.Checkbox
                          key={`add-event-skill-${skill._id}`}
                          id={`add-event-skill-${index}`}
                          label={skill.name}
                          name='specialSkills'
                          value={skill._id}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <div style={{ paddingTop: '6px' }}>Environmental setting of the opportunity?</div>
              <Form.Group inline>
                {environmentalArray.map((environmental, index) => (
                  <Form.Radio
                    key={`add-event-environmental-preference-${environmental._id}`}
                    id={`add-event-environmental-preference-${index}`}
                    label={environmental.name}
                    name='environmentalPreference'
                    value={environmental._id}
                    checked={environmentalPreference === environmental._id}
                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
              <SubmitField value='Create This Opportunity!' id={COMPONENT_IDS.ADD_EVENT_FORM_SUBMIT}/>
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
AddEvent.propTypes = {
  location: PropTypes.object,
  interestsArray: PropTypes.array.isRequired,
  skillsArray: PropTypes.array.isRequired,
  environmentalArray: PropTypes.array.isRequired,
  organization: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Interests and other collections.
  const subscription1 = Interests.subscribe();
  const subscription2 = SpecialSkills.subscribe();
  const subscription3 = Environmental.subscribe();
  const subscription4 = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
  // Get the document
  const interestsArray = Interests.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  const organization = OrganizationProfiles.findOne({ userID: Meteor.userId() }, {});
  return {
    organization,
    interestsArray,
    skillsArray,
    environmentalArray,
    ready,
  };
})(AddEvent);
