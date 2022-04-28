import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class OrganizationLibraryPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ORGANIZATION_LIB}`;
    this.pageSelector = Selector(this.pageId);
    this.cardId = `#${COMPONENT_IDS.ORGANIZATION_LIB_CARD}`;
    this.cardSelector = Selector(this.cardId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that org card in this page is currently displayed. */
  async isOrgCardDisplayed() {
    await t.expect(this.cardSelector.exists).ok();
  }

}

export const organizationLibraryPage = new OrganizationLibraryPage();
