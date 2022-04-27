import React, { useState, useEffect } from 'react';
import { Container, Table, Header, Loader, Form, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { Events } from '../../api/event/EventCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { EndedEventVolunteerHoursUpdateMethod } from '../../api/event/EventCollection.methods';
import { EndedEvent } from '../../api/event/EndedEventsCollection';
import { EndedEventsVolunteerList } from '../../api/event/EndedEventVolunteerListCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VolunteerListForEvent = ({ ready, event, volunteers, filledIn, endHourVolList }) => {

  // eslint-disable-next-line consistent-return
  const findTime = (startTime, endTime) => {
    if (startTime && endTime) {
      const startTimeArr = startTime.split(':');
      const endTimeArr = endTime.split(':');
      let hoursDiff = endTimeArr[0] - startTimeArr[0];
      let minDiff = (endTimeArr[1] - startTimeArr[1]) * 0.01;
      if (minDiff < 0) {
        hoursDiff--;
        minDiff = 0.60 + minDiff;
      }
      return hoursDiff + minDiff;
    }
  };

  const [volunteerHourArray, setVolunteerHourArray] = useState([]);
  const [maxHours, setMaxHours] = useState();
  // https://thewebdev.info/2021/03/14/how-to-fix-the-react-usestate-hook-not-setting-initial-value-problem/
  useEffect(() => {
    const timeDiff = findTime(event.eventStartTime, event.eventEndTime);
    setMaxHours(timeDiff);
    setVolunteerHourArray(volunteers.map((volunteer) => ({ volunteerID: volunteer.userID, participateHours: timeDiff, attended: false })));
  }, [volunteers, event]);

  const headers = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Email', key: 'email' },
    { label: 'Hours Volunteered', key: 'hours' },
  ];
  const findVolunteer = (element) => (volunteers.find(volunteer => volunteer.userID === element.volunteerID));

  const dataCsv =
    endHourVolList.map((data) => (
      { firstName: findVolunteer(data).firstName, lastName: findVolunteer(data).lastName, email: findVolunteer(data).email, hours: data.participateHours }
    ));

  const csvReport = {
    data: dataCsv,
    headers: headers,
    filename: `${event.eventName}_Volunteer_Hours_List.csv`,
  };

  const [temp, setTemp] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [hoursOverLimit, setHourOverLimit] = useState(false);

  const isChecked = (index) => ((typeof volunteerHourArray[index] === 'undefined') ? false : volunteerHourArray[index].attended);

  const notOverLimited = (num, min, max) => {
    if (num > max) {
      swal({
        title: 'Error',
        text: `Participation time cannot be larger than ${max} hours`,
        icon: 'error',
        timer: 1500,
      });
      return false;
    }
    if (num < min) {
      swal({
        title: 'Error',
        text: `Participation time cannot be less than ${min} hour`,
        icon: 'error',
        timer: 1500,
      });
      return false;
    }
    return true;
  };

  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value, index }) => {
    switch (name) {
    case 'volunteer-hours':
      volunteerHourArray[index].participateHours = value;
      setVolunteerHourArray(volunteerHourArray);
      // console.log(volunteerHourArray.map(data => notOverLimited(data.participateHours, 0, maxHours)).includes(false));
      setHourOverLimit(volunteerHourArray.map(data => notOverLimited(data.participateHours, 0, maxHours)).includes(false));
      break;
    case 'attended-checkbox':
      volunteerHourArray[index].attended = (!volunteerHourArray[index].attended);
      setVolunteerHourArray(volunteerHourArray);
      setTemp((temp % 100) + 1);
      break;
    case 'attended-check-all':
      if (!checkAll) {
        volunteerHourArray.map(volunteerHour => {
          // eslint-disable-next-line no-param-reassign
          volunteerHour.attended = true;
          return volunteerHour;
        });
        setCheckAll(true);
      } else {
        volunteerHourArray.map(volunteerHour => {
          // eslint-disable-next-line no-param-reassign
          volunteerHour.attended = false;
          return volunteerHour;
        });
        setCheckAll(false);
      }
      // console.log(volunteerHourArray);
      break;
    default:
        // do nothing.
    }
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    // console.log(volunteerHourArray);
    if (!hoursOverLimit) {
      EndedEventVolunteerHoursUpdateMethod.callPromise({ eventID: event._id, volunteerHourArray })
        .catch(error => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          swal({
            title: 'Success',
            text: 'Volunteer Hour Confirmed',
            icon: 'success',
            timer: 1500,
          });
          // setRedirectToReferer(true);
        });
    }
  };

  if (filledIn) {
    // const { from } = location.state || { from: { pathname: '/' } };
    swal({
      title: 'Filled out',
      text: 'This events has been filled out.',
      icon: 'info',
      timer: 1500,
    });
    // return <Redirect to={from}/>;
  }

  return ((ready) ? (
    <Container id={PAGE_IDS.LIST_VOLUNTEER_AT_EVENT}>
      <Header as="h2" textAlign="center">Volunteer List For { event.eventName }</Header>
      <Form onSubmit={submit}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Hours participated</Table.HeaderCell>
              <Table.HeaderCell style={{ paddingTop: '16px', paddingBottom: '0px' }}>
                Attended?
                <br/>
                <Form.Group style={{ paddingTop: '6px' }}>
                  <Form.Checkbox
                    id={COMPONENT_IDS.VOLUNTEER_HOUR_EVENT_FORM_CHECKBOX_CHECK_ALL}
                    name="attended-check-all"
                    onChange={handleChange}
                    disabled={filledIn === true}/>
                  <label>Check All</label>
                </Form.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(!filledIn) ? (volunteers.map((volunteer, index) => (
              <Table.Row key={`list-volunteer-table-row-${index}`}>
                <Table.Cell>{volunteer.lastName} {volunteer.firstName}</Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Input
                      id={`volunteer-hour-input-${index}`}
                      icon="clock outline"
                      iconPosition="left"
                      type="decimal"
                      placeholder="0"
                      name="volunteer-hours"
                      index={index}
                      defaultValue={maxHours}
                      max={maxHours}
                      min={0}
                      disabled={isChecked(index) === false}
                      onChange={handleChange}
                    />
                    <label>Hours</label>
                  </Form.Group>
                </Table.Cell>
                <Table.Cell width={3}>
                  <Form.Checkbox
                    id={`volunteer-attended-checkbox-${index}`}
                    name="attended-checkbox"
                    index={index}
                    checked={isChecked(index) === true}
                    onChange={handleChange}/>
                </Table.Cell>
              </Table.Row>
            ))) :
              endHourVolList.map((data, index) => (
                <Table.Row key={`list-volunteer-list-table-row-${index}`}>
                  <Table.Cell>
                    {findVolunteer(data).lastName} {findVolunteer(data).firstName}
                  </Table.Cell>
                  <Table.Cell>
                    <label>{data.participateHours} &nbsp; Hours</label>
                  </Table.Cell>
                  <Table.Cell width={3}>
                    {data.attended.toString()}
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <div style={{ paddingBottom: '30px' }} >
          <Form.Button floated='right' type='submit' >Confirm</Form.Button>
        </div>
        <div style={{ paddingBottom: '30px', paddingTop: '10px' }}>
          <Form.Button floated='right'>
            <CSVLink style={{ color: 'rgba(0, 0, 0, 0.6)' }}{...csvReport}>Export to CSV</CSVLink>
          </Form.Button>
        </div>
      </Form>
    </Container>
  ) : <Loader active>Getting data</Loader>);
};

// Require an array of Stuff documents in the props.
VolunteerListForEvent.propTypes = {
  location: PropTypes.object,
  event: PropTypes.object.isRequired,
  volunteers: PropTypes.array.isRequired,
  filledIn: PropTypes.bool.isRequired,
  endHourVolList: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const { _id } = match.params;
  const eventID = _id;
  // Get access to all documents.
  const subscription1 = Events.subscribe();
  const subscription2 = VolunteerEvent.subscribe();
  const subscription3 = VolunteerProfiles.subscribe();
  const subscription4 = EndedEvent.subscribe();
  const subscription5 = EndedEventsVolunteerList.subscribe();
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
    && subscription5.ready();
  // Get the Stuff documents and sort them by name.
  const event = (subscription1.ready()) ? Events.findOne({ _id: eventID }, {}) : {};
  const volEventArray = VolunteerEvent.find({ eventID: eventID }, {}).fetch();
  const volunteerIDArray = volEventArray.map(volEvent => volEvent.volunteerID);
  const volunteers = volunteerIDArray.map(volunteerID => VolunteerProfiles.findOne({ userID: volunteerID }, { sort: { lastName: 1 } }));
  const filledIn = !!(EndedEvent.findOne({ eventID: eventID }, {}));
  const endEventArray = EndedEvent.find({ eventID: eventID }, {}).fetch();
  const endHourVolList = (filledIn) ? endEventArray.map(endEvent => EndedEventsVolunteerList.findOne({ _id: endEvent.listID }, {})) : [];
  return {
    event,
    volunteers,
    filledIn,
    endHourVolList,
    ready,
  };
})(VolunteerListForEvent);
