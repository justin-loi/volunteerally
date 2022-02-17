import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import LandingTopSection from '../components/landing/LandingTopSection';
import LandingEventCalendarSection from '../components/landing/LandingEventCalendarSection';
import LandingOpportunitiesByCategorySection from '../components/landing/LandingOpportunitiesByCategorySection';
import LandingBottomSection from '../components/landing/LandingBottomSection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';

/** A simple static component to render some text for the landing page. */
const Landing = ({ ready, organizations }) => ((ready) ? (
  <div>
    <LandingTopSection/>
    <Container>
      <Image.Group>
        {organizations.map((organization) => <Image key={organization._id} organization={organization} src={organization.logoImage} />)}
      </Image.Group>
    </Container>
    <LandingEventCalendarSection/>
    <LandingOpportunitiesByCategorySection/>
    <LandingBottomSection/>
  </div>
) : <Loader active>Getting data</Loader>);

// Require an Event object in the props.
Landing.propTypes = {
  organizations: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const organizations = OrganizationProfiles.find({}, { sort: { name: 1 } }).fetch();
  return {
    organizations,
    ready,
  };
})(Landing);
