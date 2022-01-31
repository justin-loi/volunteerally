import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders the Page for adding a document. */
const PrivacyPolicy = () => (
  <Grid id={PAGE_IDS.ABOUT_US} container centered>
    <Grid.Column>
      <div className="about-us-header">
        <Header as="h1" textAlign="center">Privacy Policy</Header>
      </div>
      <div className="row, about-us-section">
        <Header as="h2" textAlign="left align"> An Easier Way To Volunteer. </Header>
        <p>
          It is Volunteer Ally’s policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to volunteerally.org (hereinafter, “us”, “we”, or “volunteerally.org”). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy (“Privacy Policy”) to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.
          This Privacy Policy, together with the Terms of service posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms of service.</p>
      </div>
      <div className="row, about-us-middle-section">
        <Header as="h2" textAlign="left align"> Why VolunteerAlly? </Header>
        <p>Volunteer opportunities are vitally important to the wellbeing of a community.
            VolunteerAlly makes it easy for volunteers to find organizations in need, and for organizations to
            find qualified volunteers.
        </p>
        <p>VolunteerAlly makes it simple to give back</p>
      </div>
      <div className="row, about-us-middle-section">
        <Header as="h2" textAlign="left align"> VolunteerAlly Team </Header>
        <p>Board Chair: Leslie Kobayashi <br/>
                Board Vice-Chair: Ronald Sakamoto <br/>
                President: C. Scott Wo <br/>
                Director: Malindi Brand <br/>
          <br/>
                Executive Director: Nancy Wo <br/>
                Webmaster: Chase Conching <br/>
                Secretary: Patricia McCarthy<br/>
                Treasurer: Jodi Ching<br/>
          <br/>
          <u>Launch Team</u> <br/>
          <br/>
                Curren Gaspar<br/>
                Jonathan Turner<br/>
          <br/>
                Founder: Allyson Wo</p>
      </div>
    </Grid.Column>
  </Grid>
);

export default PrivacyPolicy;
