import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout() {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists;
    if (loggedInUser) {
      await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
      await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
    }
  }

  async gotoSigninPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN}`);
  }

  async gotoVolunteerSignupPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_VOLUNTEER_SIGNUP}`);
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(username) {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).innerText;
    await t.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
  }

  /** Go to the add stuff page. */
  async gotoAddStuffPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_ADD_STUFF}`);
  }

  /** Go to the list stuff page. */
  async gotoListStuffPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_STUFF}`);
  }

  /** Go to the list stuff admin page. */
  async gotoListStuffAdminPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN}`);
  }

  /** Go to the manage database page. Must be adimin. */
  async gotoManageDatabasePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE}`);
  }

  /** Go to the list stuff page. */
  async gotoVolunteerProfilePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.expect(Selector(`#${COMPONENT_IDS.VOLUNTEER_PROFILE}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE}`);
  }

  async gotoBrowseOpportunityPage() {
    await t.click(`#${COMPONENT_IDS.NAVBAR_BROWSE_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES}`);
  }

  async gotoEventProfilePage() {
    await t.click(`#${COMPONENT_IDS.NAVBAR_BROWSE_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES}`);
    await t.click(`#${COMPONENT_IDS.EVENT_CARD}`);
  }

  async goToInboxPage() {
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.INBOX}`);
  }

  /** Go to the organization library page. */
  async gotoOrganizationLibraryPage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY}`);
  }
}

export const navBar = new NavBar();
