import React, { useState } from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { genderAllowValues, genderComponentID, numberOnly, checkboxHelper } from '../components/VolunteerUsefulFunction';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { Availabilities } from '../../api/availability/AvailabilityCollection';
import { editVolunteerLinkedCollectionMethod } from '../../api/volunteer/VolunteerProfileCollection.methods';
import { VolunteerInterest } from '../../api/interest/VolunteerInterestCollection';
import { VolunteerSkill } from '../../api/special_skills/VolunteerSkillCollection';
import { VolunteerEnvironmental } from '../../api/environmental_preference/VolunteerEnvironmentalCollection';
import { VolunteerAvailability } from '../../api/availability/VolunteerAvailabilityCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const formSchema = new SimpleSchema({
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  gender: { type: String, optional: true },
  address: { type: String, optional: true },
  city: { type: String, optional: true },
  state: { type: String, optional: true },
  code: { type: String, optional: true },
  phoneNumber: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single volunteer. */
const EditVolunteerProfile = ({ location, volunteer, volInterests, volSkills, volEnv, volAvas,
  interestsArray, skillsArray, environmentalArray, availabilitiesArray, ready }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [genderValue, setGender] = useState(volunteer.gender);
  const [interests, setInterests] = useState(volInterests.map(volInterest => volInterest.interestID));
  const [specialSkills, setSpecialSkills] = useState(volSkills.map(volSkill => volSkill.skillID));
  const [environmentalPreference, setEnvironmentalPreference] = useState(volEnv.environmentalID);
  const [availability, setAvailability] = useState(volAvas.map(volAva => volAva.availabilityID));
  const [temp, setTemp] = useState(1);
  const [image, setImage] = useState('');

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
    case 'gender':
      setGender(value);
      break;
    case 'image':
      setImage(value);
      break;
    case 'interests':
      setInterests(checkboxHelper(interests, value));
      setTemp((temp % 100) + 1);
      break;
    case 'specialSkills':
      setSpecialSkills(checkboxHelper(specialSkills, value));
      setTemp((temp % 100) + 1);
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      break;
    case 'availability':
      setAvailability(checkboxHelper(availability, value));
      setTemp((temp % 100) + 1);
      break;
    default:
        // do nothing.
    }
  };

  // On successful submit, insert the data.
  const submit = (data) => {
    if (numberOnly(data.code)) {
      const { firstName, lastName, address, gender, city, state, code, phoneNumber, _id } = data;
      const collectionName = VolunteerProfiles.getCollectionName();
      const updateData = { id: _id, firstName, lastName, gender, address, city, state, code, phoneNumber };
      // eslint-disable-next-line no-param-reassign
      updateData.image = image;
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => swal('Success', 'updated updated successfully', 'success'));
      editVolunteerLinkedCollectionMethod.callPromise({ profileID: _id, interests: interests, skills: specialSkills, environmental: environmentalPreference, availabilities: availability })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'updated updated successfully', 'success');
          setRedirectToReferer(true);
        });
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/volunteer-profile' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }

  return (ready) ? (
    <Grid id={PAGE_IDS.EDIT_VOLUNTEER_PROFILE} container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Update Your Information</Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={volunteer}>
          <Segment>
            <div style={{ paddingBottom: '6px' }}>Date Of Birth: {volunteer.dob} (contact administrator to make change)</div>
            <div className="two fields">
              <div className="field">
                <TextField name='firstName' label='First Name' placeholder='First Name'/>
              </div>
              <div className="field">
                <TextField name='lastName' label='Last Name' placeholder='Last Name'/>
              </div>
            </div>
            <HiddenField name='gender' value={genderValue}/>
            <Form.Group inline>
              <label>Gender </label>
              {genderAllowValues.map((value, index) => (
                <Form.Radio
                  key={`volunteer-signup-gender-${index}`}
                  id={genderComponentID[index]}
                  label={value}
                  name='gender'
                  value={value}
                  update={temp}
                  checked={genderValue === value}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
            <TextField id={COMPONENT_IDS.EDIT_VOLUNTEER_ADDRESS} name='address' placeholder='1234 Example Street' iconLeft='map marker alternate'/>
            <div className="two fields">
              <div className="field">
                <TextField name='city' placeholder='Honolulu' iconLeft='map marker alternate'/>
              </div>
              <div className="field">
                <TextField name='state' placeholder='Hawaii' iconLeft='map marker alternate'/>
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <TextField name='code' placeholder='96822' label='Zip/Postal Code' iconLeft='map marker alternate'/>
              </div>
              <div className="field">
                <TextField name='phoneNumber' placeholder='18081234567' label='Phone Number' iconLeft='phone'/>
              </div>
            </div>
            <div className="field">
              <h4>Upload a Profile Picture</h4>
              <Form.Input
                style={{ marginTop: '10px' }}
                type='file' onChange={(event) => {
                  uploadImg(event.target.files);
                }}
              />
            </div>
            <label style={{ paddingTop: '20px' }}>Interests </label>
            <Form.Group>
              <Grid columns={2} container>
                <Grid.Row>
                  {interestsArray.map((interest, index) => (
                    <Grid.Column key={`volunteer-signup-grid-interests-${index}`}>
                      <Form.Checkbox
                        key={`volunteer-signup-interests-${interest._id}`}
                        id={`volunteer-signup-interests-${index}`}
                        label={interest.name}
                        name='interests'
                        value={interest._id}
                        checked = {interests.includes(interest._id)}
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Form.Group>
            <label style={{ paddingTop: '20px' }}>Special Skills (optional) </label>
            <Form.Group>
              <Grid columns={2} container>
                <Grid.Row>
                  {skillsArray.map((skill, index) => (
                    <Grid.Column key={`volunteer-signup-grid-skills-${index}`}>
                      <Form.Checkbox
                        key={`volunteer-signup-skill-${skill._id}`}
                        id={`volunteer-signup-skill-${index}`}
                        label={skill.name}
                        name='specialSkills'
                        value={skill._id}
                        checked = {specialSkills.includes(skill._id)}
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Form.Group>
            <div style={{ paddingTop: '6px' }}>Environmental Preference</div>
            <Form.Group inline>
              {environmentalArray.map((environmental, index) => (
                <Form.Radio
                  key={`volunteer-signup-environmental-preference-${environmental._id}`}
                  id={`volunteer-signup-environmental-preference-${index}`}
                  label={environmental.name}
                  name='environmentalPreference'
                  value={environmental._id}
                  checked={environmentalPreference === environmental._id}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
            <label style={{ paddingTop: '20px' }}>Availability </label>
            <Form.Group>
              <Grid columns={2} container>
                <Grid.Row>
                  {availabilitiesArray.map((ava, index) => (
                    <Grid.Column key={`volunteer-signup-grid-availability-${index}`}>
                      <Form.Checkbox
                        key={`volunteer-signup-availability-${ava._id}`}
                        id={`volunteer-signup-availability-${index}`}
                        label={ava.name}
                        name='availability'
                        value={ava._id}
                        checked = {availability.includes(ava._id)}
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Form.Group>
            <SubmitField value='Submit' />
            <ErrorsField />
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a volunteer profile document in the props object. Uniforms adds 'model' to the props, which we use.
EditVolunteerProfile.propTypes = {
  location: PropTypes.object,
  volunteer: PropTypes.object,
  volInterests: PropTypes.array.isRequired,
  volSkills: PropTypes.array.isRequired,
  volEnv: PropTypes.object.isRequired,
  volAvas: PropTypes.array.isRequired,
  interestsArray: PropTypes.array.isRequired,
  skillsArray: PropTypes.array.isRequired,
  environmentalArray: PropTypes.array.isRequired,
  availabilitiesArray: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const volunteerId = _id;
  // Get access to volunteer profile documents.
  const subscription = VolunteerProfiles.subscribeCurrVolProfile();
  // Get VolInterests and other collections.
  const subscription2 = VolunteerInterest.subscribe();
  const subscription3 = VolunteerSkill.subscribe();
  const subscription4 = VolunteerEnvironmental.subscribe();
  const subscription5 = VolunteerAvailability.subscribe();
  // Get access to Interests and other collections.
  const subscription6 = Interests.subscribe();
  const subscription7 = SpecialSkills.subscribe();
  const subscription8 = Environmental.subscribe();
  const subscription9 = Availabilities.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3 && subscription4 && subscription5 &&
    subscription6.ready() && subscription7.ready() && subscription8.ready() && subscription9.ready();
  // Get the document
  const volunteer = VolunteerProfiles.findDoc(volunteerId);

  // get volunteer interests and other volunteer linked collection
  // can use fields: { interestID: 1 } ?
  const volInterests = VolunteerInterest.find({ volunteerID: volunteer.userID }, { }).fetch();
  const volSkills = VolunteerSkill.find({ volunteerID: volunteer.userID }, { }).fetch();
  const volEnv = VolunteerEnvironmental.findOne({ volunteerID: volunteer.userID }, {});
  const volAvas = VolunteerAvailability.find({ volunteerID: volunteer.userID }, { }).fetch();

  const interestsArray = Interests.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  const availabilitiesArray = Availabilities.find({}, {}).fetch();
  return {
    volunteer,
    ready,
    volInterests,
    volSkills,
    volEnv,
    volAvas,
    interestsArray,
    skillsArray,
    environmentalArray,
    availabilitiesArray,
  };
})(EditVolunteerProfile);
