import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Segment, Form, Loader } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, LongTextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import Axios from 'axios';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { checkboxHelper } from '../components/VolunteerUsefulFunction';
import { addNewEventMethod } from '../../api/event/EventCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  eventDescription: String,
  eventCardImage: { type: String, optional: true },
  eventProfileImage: { type: String, optional: true },
  eventAddress: String,
  eventCity: String,
  eventState: String,
  eventZip: String,
  eventTime: String,
  orgName: String,
  eventLocation: String,
  eventDate: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Add Event, adds a new event.
 */
const AddEvent = ({ location, ready, interestsArray, skillsArray, environmentalArray, }) => {
  const [interests, setInterests] = useState([]);
  const [specialSkills, setSpecialSkills] = useState([]);
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [eventDate, setDate] = useState('');
  const [eventCardImage, setImage] = useState('');
  const [eventProfileImage, setImage2] = useState('');
  const [isValueEmpty, setIsValueEmpty] = useState(Array(2).fill(false));

  const setIsValueEmptyHelper = (index, value) => {
    isValueEmpty[index] = value;
    setIsValueEmpty(isValueEmpty);
  };

  // reference: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  const isValidDate = (dateString) => {
    // declare and initialize variables
    const today = new Date();
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      setIsValueEmptyHelper(0, true);
      swal('Error!', 'Please enter the correct date format mm/dd/yyyy', 'error');
      return false;
    }
    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < (today.getFullYear) || month === 0 || month > 12) {
      setIsValueEmptyHelper(0, true);
      swal('Error!', 'Invalid date', 'error');
      return false;
    }
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }
    // Check the range of the day
    if (day < 0 && day >= monthLength[month - 1]) {
      setIsValueEmptyHelper(0, true);
      swal('Error!', 'Invalid date', 'error');
      return false;
    }
    return true;
  };

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
  const isNotEmpty = (value) => (!value);
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'eventDate':
      setIsValueEmptyHelper(0, isNotEmpty(value));
      setDate(value);
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
    case 'eventCardImage' || 'eventProfileImage':
      setImage(value);
      break;
    default:
      // do nothing.
    }
  };
  /* Handle SignUp submission. Create the event and populate events, orgEvents collections. */
  const submit = (data, formRef) => {
    if (isValidDate(data.eventDate)) {
      // eslint-disable-next-line no-param-reassign
      data.interests = interests;
      // eslint-disable-next-line no-param-reassign
      data.skills = specialSkills;
      // eslint-disable-next-line no-param-reassign
      data.environmental = environmentalPreference;
      data.eventCardImage = eventCardImage;
      data.eventProfileImage = eventProfileImage;
      // eslint-disable-next-line no-param-reassign
      addNewEventMethod.callPromise(data)
        .catch(error => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          // Not sure why it catches the error but still executes
          formRef.reset();
          setDate('');
          setInterests([]);
          setSpecialSkills([]);
          setEnvironmentalPreference('');
          setImage('');
          setImage2('');
          swal({
            title: 'Opportunity Added Successfully!',
            text: 'This event now has an event card and event profile!',
            icon: 'success',
            timer: 1500,
          });
          setRedirectToReferer(true);
        });
    }
  };

  /* Display the event creation form. Redirect to the event profile page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/event-profile' } };
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
              <TextField name='organizationName' type='name' label='Organization Name' placeholder='The Red Cross' iconLeft='lock' id={COMPONENT_IDS.ADD_EVENT_NAME}/>
              <TextField name='eventDate' type='date' label='Event Date' placeholder='04/20/1989' iconLeft='calendar' id={COMPONENT_IDS.ADD_EVENT_NAME}/>
              <LongTextField name='eventDescription' type='description' placeholder='Looking for ocean loving volunteers to clean up...' iconLeft='bullhorn' id={COMPONENT_IDS.ADD_EVENT_DESCRIPTION}/>
              <HiddenField name='eventDate' label='Event Date' value={eventDate} />
              <Form.Input
                label="Event Date"
                id={COMPONENT_IDS.ADD_EVENT_DATE}
                icon="calendar alternate outline"
                iconPosition="left"
                name="eventDate"
                placeholder="04/20/1989"
                onChange={handleChange}
                required
                error={ isValueEmpty[0] }
              />
              <TextField name='address' placeholder='1234 Example Street' iconLeft='map marker alternate'
                id={COMPONENT_IDS.ADD_EVENT_ADDRESS} required/>
              <div className="two fields">
                <div className="field">
                  <TextField name='city' placeholder='Honolulu' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_CITY} required/>
                </div>
                <div className="field">
                  <TextField name='state' placeholder='Hawaii' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_STATE} required/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <TextField name='code' placeholder='96822' label='Zip/Postal Code' iconLeft='map marker alternate'
                    id={COMPONENT_IDS.ADD_EVENT_ZIPCODE} required/>
                </div>
              </div>
              <div className="field">
                <h4>Upload an Event Card Picture (smaller image)</h4>
                <Form.Input
                  style={{ marginTop: '10px' }}
                  type='file' onChange={(event) => {
                    uploadImg(event.target.files);
                  }}
                />
              </div>
              <div className="field">
                <h4>Upload an Event Profile Banner Picture (larger image)</h4>
                <Form.Input
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Interests and other collections.
  const subscription1 = Interests.subscribe();
  const subscription2 = SpecialSkills.subscribe();
  const subscription3 = Environmental.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  // Get the document
  const interestsArray = Interests.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  return {
    interestsArray,
    skillsArray,
    environmentalArray,
    ready,
  };
})(AddEvent);
