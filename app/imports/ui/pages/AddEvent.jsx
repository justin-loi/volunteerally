import React from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
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
class AddEvent extends React.Component {

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
      <Grid id={PAGE_IDS.ADD_EVENT} container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Event</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='eventName'/>
              <TextField name='location'/>
              <TextField name='date'/>
              <TextField name='time'/>
              <RadioField name='categories'/>
              <a className="ui label">Online<i className="delete icon"/></a>
              <a className="ui label">In-Person<i className="delete icon"/></a>
              <LongTextField name='description'/>
              <RadioField name='eventImage'/>
              <Button class='ui labeled icon button'><i className="upload icon"/>Upload Image</Button>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddEvent;
