import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class VolunteerSignup {
  constructor() {
    this.pageId = `#${PAGE_IDS.VOLUNTEER_SIGNUP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupVolunteer(username, password) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_USERNAME}`, username);
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PASSWORD}`, password);
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CONFIRM_PASSWORD}`, password);
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_BIRTH}`, '04/20/1989');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_FIRST}`, 'John');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_LAST}`, 'foo');
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_GENDER_MALE}`);
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ADDRESS}`, '123 University St.');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_CITY}`, 'Honolulu');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_STATE}`, 'HI');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ZIPCODE}`, '96815');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_PHONE}`, '8081234567');
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_ANIMALS}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_AGRICULTURE}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_INDOOR}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_MONTHLY}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_POLICY}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_SIGNUP_FORM_SUBMIT}`);
  }
}

export const volunteerSignupPage = new VolunteerSignup();
