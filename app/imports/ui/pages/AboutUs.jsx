import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import GoogleMap from '../components/GoogleMap';


/** Renders the Page for adding a document. */
const AboutUs = () => (
  <Grid id={PAGE_IDS.ABOUT_US} container centered>
    <Grid.Column>
      <div className="about-us-header">
        <Header as="h1" textAlign="center">About VolunteerAlly</Header>
      </div>
      <div className="row, about-us-section">
        <Header as="h2" textAlign="left align"> An Easier Way To Volunteer. </Header>
        <p>VolunteerAlly is a non-profit organization designed to help pair volunteers with organizations
              in need of service. On our site you can find numerous organizations and their volunteer opportunites
              all in one place. Once a user, you will have access to sign up for the various volunteer opportunities,
              from one-time opportunities to flexible/reoccuring opportunities. VolunteerAlly is designed to make volunteering easy.</p>
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
      <div className="row, about-us-middle-section">
        <GoogleMap/>
      </div>
    </Grid.Column>
  </Grid>
);

export default AboutUs;
