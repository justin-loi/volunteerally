import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AdminManageBoardPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LIST_STUFF_ADMIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** change to event tap */
  async changeToEventTap() {
    await t.click('#root > div > div:nth-child(2) > div > div.four.wide.column > div > a:nth-child(2)');
  }

  /** click event hour button */
  async clickEventHourButton() {
    await t.click(`#${COMPONENT_IDS.ADMIN_VIEW_EVENT_HOUR_BUTTON}`);
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async clickVolunteerListForEventConfirmButton() {
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_HOUR_EVENT_FORM_CHECKBOX_CHECK_ALL}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_LIST_FOR_EVENT_CONFIRM_BUTTON}`);
  }
}

export const adminManageBoardPage = new AdminManageBoardPage();
