import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

const formSchema = new SimpleSchema({
  eventBackgroundImage: { type: String, optional: true },
  logoImage: { type: String, optional: true },
  organizationName: { type: String, optional: true },
  missionStatement: { type: String, optional: true },
  phoneNumber: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
const EditOrganizationProfile = ({ doc, ready }) => {

  // On successful submit, insert the data.
  const submit = (data) => {
    const { eventBackgroundImage, logoImage, organizationName, missionStatement, phoneNumber, _id } = data;
    const collectionName = OrganizationProfiles.getCollectionName();
    const updateData = { id: _id, eventBackgroundImage, logoImage, organizationName, missionStatement, phoneNumber };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  return (ready) ? (
    <Grid id={PAGE_IDS.EDIT_STUFF} container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Edit OrganizationProfile</Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Segment>
            <TextField name='eventBackgroundImage' />
            <TextField name='logoImage' />
            <TextField name='organizationName' />
            <TextField name='phoneNumber' />
            <LongTextField name='missionStatement' />
            <SubmitField value='Submit' />
            <ErrorsField />
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditOrganizationProfile.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const orgProfileId = _id;
  // Get access to Org documents.
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = OrganizationProfiles.find({ _id: orgProfileId }, {}).fetch().pop();
  return {
    doc,
    ready,
  };
})(EditOrganizationProfile);
