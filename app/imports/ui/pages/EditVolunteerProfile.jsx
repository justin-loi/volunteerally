import React, { useState } from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const genderAllowValues = ['Male', 'Female', 'Other', 'Prefer Not to Say'];
const genderComponentID = [COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_MALE, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_FEMALE,
  COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_OTHER, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_NO_SAY];

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

/** Renders the Page for editing a single document. */
const EditVolunteerProfile = ({ doc, ready }) => {
  const [genderValue, setGender] = useState(doc.gender);

  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'gender':
      setGender(value);
      break;
    default:
        // do nothing.
    }
  };

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, address, gender, city, state, code, phoneNumber, _id } = data;
    const collectionName = VolunteerProfiles.getCollectionName();
    const updateData = { id: _id, firstName, lastName, gender, address, city, state, code, phoneNumber };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'updated updated successfully', 'success'));
  };

  return (ready) ? (
    <Grid id={PAGE_IDS.EDIT_VOLUNTEER_PROFILE} container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Update Your Information</Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Segment>
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
                  checked={genderValue === value}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
            <TextField name='address' placeholder='1234 Example Street' iconLeft='map marker alternate'/>
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
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const documentId = _id;
  // Get access to volunteer profile documents.
  const subscription = VolunteerProfiles.subscribeCurrVolProfile();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = VolunteerProfiles.findDoc(documentId);
  return {
    doc,
    ready,
  };
})(EditVolunteerProfile);
