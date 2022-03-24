import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/EventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  location: String,
  categories: String,
  description: String,
  eventImage: String,
  date: String,
  time: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Page for adding a document. */
class AddOpportunity extends React.Component {

  submit(data, formRef) {
    const { eventName, location, categories, description, eventImage, date, time } = data;
    const owner = Meteor.user().username;
    Events.collection.insert({ eventName, location, categories, description, eventImage, date, time, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <Grid id={PAGE_IDS.ADD_OPPORTUNITY} container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Opportunity</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='eventName'/>
              <TextField name='location'/>
              <TextField name='date'/>
              <TextField name='time'/>
              <RadioField name='categories'/>
              <div className="ui form">
                <div className="field">
                  <select multiple="" className="ui dropdown">
                    <option value="">Select Option</option>
                    <option value="Online">Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <LongTextField name='description'/>
              <RadioField name='eventImage'/>
              <div className="ui placeholder segment">
                <div className="ui icon header">
                  <i className="pdf file outline icon"> </i>
                  No image uploaded.
                </div>
                <div className="ui primary button">Add Image</div>
              </div>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddOpportunity;import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/EventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  location: String,
  categories: String,
  description: String,
  eventImage: String,
  date: String,
  time: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Page for adding a document. */
class AddOpportunity extends React.Component {

  submit(data, formRef) {
    const { eventName, location, categories, description, eventImage, date, time } = data;
    const owner = Meteor.user().username;
    Events.collection.insert({ eventName, location, categories, description, eventImage, date, time, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <Grid id={PAGE_IDS.ADD_OPPORTUNITY} container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Opportunity</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='eventName'/>
              <TextField name='location'/>
              <TextField name='date'/>
              <TextField name='time'/>
              <RadioField name='categories'/>
              <div className="ui form">
                <div className="field">
                  <select multiple="" className="ui dropdown">
                    <option value="">Select Option</option>
                    <option value="Online">Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <LongTextField name='description'/>
              <RadioField name='eventImage'/>
              <div className="ui placeholder segment">
                <div className="ui icon header">
                  <i className="pdf file outline icon"> </i>
                  No image uploaded.
                </div>
                <div className="ui primary button">Add Image</div>
              </div>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddOpportunity;