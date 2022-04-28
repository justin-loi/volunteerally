import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class VolunteerProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.VOLUNTEER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** click the edit volunteer button. */
  async clickEditVolunteerButton() {
    await t.click(`#${COMPONENT_IDS.EDIT_VOLUNTEER_BUTTON}`);
  }
}

export const volunteerProfilePage = new VolunteerProfilePage();
