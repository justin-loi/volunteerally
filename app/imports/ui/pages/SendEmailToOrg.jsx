import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
// import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';

const formSchema = new SimpleSchema({
  title: String,
  content: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
const SendEmailToOrg = ({ organization, volunteer, ready }) => {

  // On successful submit, insert the data.
  const submit = (data) => {
    const { title, content } = data;
    console.log(data);
    console.log(organization.email);
    console.log(volunteer.email);
    const sendEmailData = { title: title, content: content,
      organizationEmail: organization.email, volunteerEmail: volunteer.email };
    console.log(sendEmailData);
  };

  return (ready) ? (
    <Grid id={PAGE_IDS.SEND_EMAIL_TO_ORG} container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Send Email to {organization.organizationName}</Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)}>
          <Segment>
            <TextField name='title' />
            <LongTextField name='content'/>
            <SubmitField value='Submit' />
            <ErrorsField />
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
SendEmailToOrg.propTypes = {
  organization: PropTypes.object,
  volunteer: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const orgProfileId = _id;
  // Get access to Stuff documents.
  const subscription = OrganizationProfiles.subscribe();
  const subscription2 = VolunteerProfiles.subscribeCurrVolProfile();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const organization = OrganizationProfiles.find({ _id: orgProfileId }, {}).fetch().pop();
  const volunteer = VolunteerProfiles.findOne({}, {});
  // console.log(doc);
  return {
    organization,
    volunteer,
    ready,
  };
})(SendEmailToOrg);
