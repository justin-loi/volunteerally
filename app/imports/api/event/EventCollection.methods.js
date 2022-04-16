import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EndedEventsVolunteerList } from './EndedEventVolunteerListCollection';
import { EndedEvent } from './EndedEventsCollection';
import { VolunteerEventHours } from '../hours/VolunteerEventHours';
import { Hours } from '../hours/HoursCollection';

export const EndedEventVolunteerHoursUpdateMethod = new ValidatedMethod({
  name: 'Event.EndedEventVolunteerHoursUpdate',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ eventID, volunteerHourArray }) {
    if (Meteor.isServer) {
      // console.log(event, volunteerHourArray);
      volunteerHourArray.map((volunteer) => {
        const docID = EndedEventsVolunteerList.define({
          volunteerID: volunteer.volunteerID,
          participateHours: (volunteer.attended) ? parseFloat(volunteer.participateHours).toFixed(2) : 0,
          attended: volunteer.attended,
        });
        EndedEvent.define({ eventID: eventID, listID: docID, volunteerID: volunteer.volunteerID });
        return 0;
      });

      // update hours
      // eslint-disable-next-line array-callback-return
      volunteerHourArray.map((volunteer) => {
        const hoursID = VolunteerEventHours.findOne({ volunteerID: volunteer.volunteerID }, {});
        const hour = Hours.findOne({ _id: hoursID.hoursID }, {});
        const total = parseFloat(hour.total) + parseFloat(parseFloat(volunteer.participateHours).toFixed(2));
        // console.log(total);
        Hours.update(hoursID.hoursID, {
          total: (volunteer.attended) ? total : 0 });
        return 0;
      });
    }
  },
});
