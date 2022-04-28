import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class EditVolunteerProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_VOLUNTEER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** click the change data. */
  async changeData() {
    await t.typeText(`#${COMPONENT_IDS.EDIT_VOLUNTEER_ADDRESS}`, '(test)');
  }

  /** click the Submit button. */
  async clickSubmitButton() {
    await t.typeText(`#${COMPONENT_IDS.EDIT_VOLUNTEER_ADDRESS}`, '(test)');
  }
}

export const editVolunteerProfilePage = new EditVolunteerProfilePage();
