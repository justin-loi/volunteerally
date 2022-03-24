/** await navBar.gotoAddStuffPage();
 await addStuffPage.isDisplayed();
 await navBar.gotoListStuffPage();
 await listStuffPage.isDisplayed();
 // want to see if we can get to the editStuffPage
 const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
 await t.click(editLinks.nth(0));
 await editStuffPage.isDisplayed();
 await navBar.gotoListStuffAdminPage();
 await listStuffAdminPage.isDisplayed();
 await navBar.gotoManageDatabasePage();
 await manageDatabasePage.isDisplayed(); */

/** await navBar.gotoAddStuffPage();
  await addStuffPage.isDisplayed();
  await navBar.gotoListStuffPage();
  await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  await t.click(editLinks.nth(0));
  await editStuffPage.isDisplayed(); */

/**
 // use in VolunteerProfileCollection.
 username: { type: String, optional: true },
 gender: { type: String, optional: true },
 dob: { type: String, optional: true },
 address: { type: String, optional: true },
 city: { type: String, optional: true },
 state: { type: String, optional: true },
 code: { type: String, optional: true },
 phoneNumber: { type: String, optional: true },
 // ^ use in VolunteerProfileCollection.
 */

/**
 NavBar:

 <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_SIGNUP} icon="building" text="Organization Sign up" as={NavLink} exact to="/organization_signup" key="organization_signup"/>

 */