import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AddOpportunityPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADD_EVENT}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

}

export const addOppPage = new AddOpportunityPage();
