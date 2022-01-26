import React from 'react';
import LandingTopSection from '../components/LandingTopSection';
import LandingMiddleSection from '../components/LandingMiddleSection';
import LandingEventCalendarSection from '../components/LandingEventCalendarSection';
import LandingOpportunitiesByCategorySection from '../components/LandingOpportunitiesByCategorySection';
import LandingBottomSection from '../components/LandingBottomSection';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <LandingTopSection/>
    <LandingMiddleSection/>
    <LandingEventCalendarSection/>
    <LandingOpportunitiesByCategorySection/>
    <LandingBottomSection/>
  </div>
);

export default Landing;
