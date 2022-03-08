import swal from 'sweetalert';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

export const genderAllowValues = ['Male', 'Female', 'Other', 'Prefer Not to Say'];

export const genderComponentID = [COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_MALE, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_FEMALE,
  COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_OTHER, COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_NO_SAY];

export const numberOnly = (value) => {
  if (/^[0-9]+$/.test(value)) {
    return true;
  }
  swal('Error!', 'Zip/Postal Code and Phone Numbers should be number only ', 'error');
  return false;
};

export const checkboxHelper = (array, value) => {
  // Reference: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  } else {
    array.push(value);
  }
  return array;
};
